"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pontos = void 0;
const PontosRep_1 = require("../repository/PontosRep");
class Pontos {
    async create(req, res) {
        const { uuid, description, address, latitude, longitude } = req.body;
        if (!uuid || !description || !address || !latitude || !longitude) {
            return res.status(400).json({ message: "Fields ( uuid, description, address, latitude, longitude ) is required." });
        }
        try {
            const create = PontosRep_1.pontosRep.create({
                uuid,
                description,
                address,
                latitude,
                longitude
            });
            await PontosRep_1.pontosRep.save(create);
            return res.status(201).json(create);
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
    async findBy(req, res) {
        const uuid = req.query.uuid;
        try {
            const response = await PontosRep_1.pontosRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
            if (!response)
                return res.status(200).json({ message: "No records found." });
            return res.json(response);
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
    async findAll(req, res) {
        try {
            const response = await PontosRep_1.pontosRep.find({ order: { id: 'ASC' } });
            if (!response)
                return res.status(200).json({ message: "No records found." });
            return res.json(response);
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
    async delete(req, res) {
        const uuid = req.query.uuid;
        if (!uuid)
            return res.status(400).json({ message: "Field (uuid) is required." });
        try {
            const response = await PontosRep_1.pontosRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
            if (response.length === 0) {
                return res.status(404).json({ message: "No records found for the provided UUID." });
            }
            await PontosRep_1.pontosRep.remove(response);
            return res.status(200).json({ message: "Records deleted successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
}
exports.Pontos = Pontos;
