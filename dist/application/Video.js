"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const VideoRep_1 = require("../repository/VideoRep");
const ChunkRep_1 = require("../repository/ChunkRep");
class Video {
    async create(req, res) {
        const { uuid, title, description } = req.body;
        if (!uuid || !title || !description)
            return res.status(400).json({ message: "Fields ( uuid, title, description ) are required." });
        const create = VideoRep_1.videoRep.create({
            uuid,
            title,
            description
        });
        const registered = await VideoRep_1.videoRep.findOneBy({ uuid: String(create.uuid) });
        if (registered)
            return res.status(400).json({ message: "Vídeo already registered." });
        await VideoRep_1.videoRep.save(create);
        return res.status(201).json(create);
    }
    async findBy(req, res) {
        const { uuid, language } = req.body;
        const video = await VideoRep_1.videoRep.findOneBy({ uuid: String(uuid) });
        if (!video)
            return res.status(200).json({ message: "No records found." });
        const chunks = await ChunkRep_1.chunkRep.find({
            where: {
                uuid: video.uuid,
                language: language,
            },
            order: {
                timestamp: 'ASC',
            },
        });
        const response = {
            video,
            chunks: chunks.map((item) => {
                return {
                    language: item.language,
                    timestamp: item.timestamp,
                    text: item.text
                };
            })
        };
        return res.json(response);
    }
    async findall(req, res) {
        const video = await VideoRep_1.videoRep.find();
        if (!video)
            return res.status(200).json({ message: "NNo records found." });
        const response = video.map(item => {
            return { uuid: item.uuid, title: item.title, description: item.description };
        });
        return res.json(response);
    }
}
exports.Video = Video;
