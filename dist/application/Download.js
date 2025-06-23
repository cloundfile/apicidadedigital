"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Download = void 0;
const youtubedl = require('youtube-dl-exec');
class Download {
    async video(req, res) {
        const videoId = req.params.videoId;
        if (!videoId)
            return res.status(400).json({ message: "videoId é obrigatório." });
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const youtube = await youtubedl(videoUrl, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
            format: 'bestvideo',
        }); /*

        const response = [];
        youtube.formats.filter((item: any) => item.resolution !== 'audio only').map((item: any) => {
            response.push({
                resolution: item.resolution,
                url: item.url
            })
        })

  
        if (response.length <= 0) {
            res.json({message: "Conteúdo bloqueado pelo youtube"})
        }
        res.json(response)


        youtube.formats.filter((format: any) => format.url !== null && format.audio_ext !== 'none').map((format: any) => {
            console.log({
                resolution: format.resolution,
                url: format
            });
            return format;
        });
        res.json({message: "indisponivel no momento"})*/
    }
    async audio(req, res) {
        const videoId = req.params.videoId;
        if (!videoId)
            return res.status(400).json({ message: "videoId é obrigatório." });
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const youtube = await youtubedl(videoUrl, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
            format: 'bestaudio',
        });
        const audio = youtube.formats.filter((format) => format.resolution === 'audio only');
        const download = audio[audio.length - 1];
        if (!download || !download.url) {
            res.json({ message: "Conteúdo bloqueado pelo youtube" });
        }
        res.json({ url: download.url });
    }
}
exports.Download = Download;
