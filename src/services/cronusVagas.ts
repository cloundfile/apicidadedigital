
import * as cheerio from 'cheerio';
import axios from 'axios';
import { AppDataSource } from '../data-source';
import { VagaRep } from '../repository/VagasRep';

export async function cronusVagas() {
  try {
    const url = 'https://pmp.pr.gov.br/website/views/vagasEmprego.php';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const linhas = $('table tbody tr').toArray();

    for (const element of linhas) {
      const tds = $(element).find('td');
      if (tds.length >= 3) {
        const cargo = $(tds[0]).text().trim();
        const quantidadeStr = $(tds[1]).text().trim();
        const requisitos = $(tds[2]).text().trim();

        const quantidade = parseInt(quantidadeStr, 10);
        if (isNaN(quantidade)) {
          console.warn(`⚠ Quantidade inválida para o cargo "${cargo}", pulando.`);
          continue;
        }

        const seqResult = await AppDataSource.manager.query(`SELECT SEQ_VAGAS.NEXTVAL AS SEQ FROM DUAL`);
        const nextSeq = seqResult && seqResult.length > 0 ? Number(seqResult[0].SEQ) : null;

        if (!nextSeq) {
          console.error('❌ Não foi possível obter o próximo valor da sequência para a vaga:', cargo);
          continue;
        }

        const novaVaga = VagaRep.create({
          seq: nextSeq,
          cidadeId: 1,
          cargo,
          quantidade,
          requisitos,
        });

        await VagaRep.save(novaVaga);
        console.log(`✔ Vaga salva: ${cargo}`);
      }
    }

  } catch (error) {
    console.error('Erro ao buscar e salvar vagas:', error);
  }
}