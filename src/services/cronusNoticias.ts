import { NoticiaRep } from '../repository/NoticiasRep';
import * as cheerio from 'cheerio';
import axios from 'axios';

const BASE_URL = 'https://pmp.pr.gov.br/website/views/';

export async function cronusNoticias() {
  try {
    const { data: html } = await axios.get(BASE_URL);
    const $ = cheerio.load(html);

    const noticias: { title: string; weblink: string }[] = [];

    $('.col').each((_, el) => {
      const title = $(el).find('.card-title, h5').text().trim();
      const weblink = $(el).find('a').attr('href');

      if (
        title &&
        weblink &&
        !['Daniel Langaro', 'Edson Lagarto'].includes(title)
      ) {
        noticias.push({
          title,
          weblink: weblink.startsWith('http') ? weblink : `${BASE_URL}${weblink}`,
        });
      }
    });

    for (const noticia of noticias) {
      try {
        const exists = await NoticiaRep.findOneBy({ title: noticia.title });
        if (exists) {
          continue;
        }

        const { data: detailHtml } = await axios.get(noticia.weblink);
        const $detail = cheerio.load(detailHtml);

        const rawThumbnail = $detail('img.img-responsive.card-img-top').attr('src') || '';
        const thumbnail = rawThumbnail.startsWith('http') 
          ? rawThumbnail 
          : `${BASE_URL}${rawThumbnail}`;

        const description = $detail('.post-content').text().trim();

        const novaNoticia = NoticiaRep.create({
          cityId: 1,
          title: noticia.title,
          thumbnail: thumbnail,
          description: description,
          weblink: noticia.weblink,
          publish: new Date(),
        });
        await NoticiaRep.save(novaNoticia);
        console.log(`✅ Notícia salva: ${noticia.title}`);
      } catch (err) {
        console.error(`❌ Falha ao salvar notícia: ${noticia.title}`, err);
      }
    }
  } catch (err) {
    console.error('Cronus falhou ao sincronizar.', err);
  }
}