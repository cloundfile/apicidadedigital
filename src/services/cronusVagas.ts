import { VagaRep } from '../repository/VagasRep';
import * as cheerio from 'cheerio';
import axios from 'axios';

const BASE_URL = 'https://pmp.pr.gov.br/website/views/vagasEmprego.php';

export async function cronusVagas() {
  try {
    const { data: html } = await axios.get(BASE_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const $ = cheerio.load(html);

    const vagas: { cargo: string; quantidade: string; requisitos: string }[] = [];

    $('tbody tr').each((_, el) => {
      const tds = $(el).find('td');
      if (tds.length >= 3) {
        const cargo = $(tds[0]).text().trim();
        const quantidadeRaw = $(tds[1]).text().trim();
        const requisitosHtml = $(tds[2]).html() || '';
        const requisitos = cheerio.load(requisitosHtml).text().replace(/\s+/g, ' ').trim();

        if (cargo && quantidadeRaw) {
          vagas.push({ cargo, quantidade: quantidadeRaw, requisitos });
        }
      }
    });

    for (const vaga of vagas) {
      try {
        const cidadeId = 1;
        const cargo = vaga.cargo.toUpperCase();
        const requisitos = vaga.requisitos;
        const quantidade = parseInt(vaga.quantidade.replace(/\D/g, ''), 10);

        if (isNaN(quantidade)) {
          console.warn(`⚠ Quantidade inválida: "${vaga.quantidade}" (Cargo: ${cargo})`);
          continue;
        }

        const exists = await VagaRep.createQueryBuilder('vaga')
          .where('UPPER(vaga.cargo) = :cargo AND vaga.cidadeId = :cidadeId', { cargo, cidadeId })
          .getOne();

        if (exists) {
          console.log(`ℹ️ Vaga já existe: ${cargo}`);
          continue;
        }

        const seqResult = await VagaRep.query(`SELECT SEQ_VAGAS.NEXTVAL AS SEQ FROM DUAL`);
        const nextSeq = Number(seqResult[0].SEQ);

        const novaVaga = VagaRep.create({
          seq: nextSeq,
          cidadeId,
          cargo,
          quantidade,
          requisitos,
        });
        await VagaRep.save(novaVaga);
        console.log(`✅ Vaga salva: ${cargo}`);
      } catch (err) {
        console.error(`❌ Erro ao salvar vaga: ${vaga.cargo}`, err);
      }
    }
  } catch (err) {
    console.error('❌ Erro ao sincronizar vagas:', err);
  }
}