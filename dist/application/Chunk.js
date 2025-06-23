"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = void 0;
const ChunkRep_1 = require("../repository/ChunkRep");
class Chunk {
    async create(req, res) {
        const { uuid, language, chunks } = req.body;
        if (!uuid || !language || !chunks) {
            return res.status(400).json({ message: "Fields ( uuid, language, chunks ) are required." });
        }
        for (const item of chunks) {
            const timestampJson = JSON.stringify(item.timestamp);
            const create = ChunkRep_1.chunkRep.create({
                uuid,
                language,
                timestamp: timestampJson,
                text: item.text
            });
            await ChunkRep_1.chunkRep.save(create);
        }
        return res.status(201).json(chunks);
    }
    async delete(req, res) {
        const { uuid, language } = req.body;
        if (!uuid || !language)
            return res.status(400).json({ message: "Field (uuid) and language are required." });
        const chunks = await ChunkRep_1.chunkRep.findBy({ uuid: String(uuid), language: String(language) });
        if (!chunks)
            return res.status(400).json({ message: "uuid não encontrado." });
        chunks.map(async (item) => {
            await ChunkRep_1.chunkRep.delete(item.id);
        });
        return res.status(201).json({ message: uuid + " Deleted successfully." });
    }
    async findby(req, res) {
        const { uuid, language } = req.body;
        const chunks = await ChunkRep_1.chunkRep.findBy({ uuid: String(uuid), language: String(language) });
        if (!chunks)
            return res.status(200).json({ message: "No records found." });
        const response = chunks.map(item => { return { uuid: item.uuid, timestamp: item.timestamp, text: item.text }; });
        return res.json(response);
    }
}
exports.Chunk = Chunk;
