import { NoticiaRep } from '../repository/NoticiasRep';
import * as cheerio from 'cheerio';
import axios from 'axios';

const BASE_URL = 'https://pmp.pr.gov.br/website/views/';
export async function cronusNoticias() {
  try {
    const { data: html } = await axios.get(BASE_URL);
    const $ = cheerio.load(html);

    const noticias: { title: string; url: string }[] = [];

    $('.col').each((_, el) => {
      const title = $(el).find('.card-title, h5').text().trim();
      const url = $(el).find('a').attr('href');

      if (
        title &&
        url &&
        !['Daniel Langaro', 'Edson Lagarto'].includes(title)
      ) {
        noticias.push({
          title,
          url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
        });
      }
    });

    for (const noticia of noticias.slice(0, 10)) {
      try {
        const { data: detailHtml } = await axios.get(noticia.url);
        const $detail = cheerio.load(detailHtml);

        const thumbnail = $detail('img.img-responsive.card-img-top').attr('src') || '';
        const description = $detail('.post-content').text().trim();

        const novaNoticia = NoticiaRep.create({
          cityId: 1,
          title: noticia.title,
          thumbnail: thumbnail,
          description: description,
          publish: new Date(),
        });

        await NoticiaRep.save(novaNoticia);
        console.log(`✅ Notícia salva: ${noticia.title}`);
      } catch (err) {
        const error = err as Error;
        if (error.message.includes('ORA-00001')) {
          
        }else {
          console.error('failed to register news: ', error.message);
        }
        
      }
    }
  } catch (err) {
    console.error('Cronus failed to sync.');
  }
}