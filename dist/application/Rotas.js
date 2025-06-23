"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotas = void 0;
const RotasRep_1 = require("../repository/RotasRep");
class Rotas {
    async create(req, res) {
        const { uuid, altitude, latitude, longitude } = req.body;
        if (!uuid || !altitude || !latitude || !longitude) {
            return res.status(400).json({ message: "Fields ( altitude, latitude, longitude ) is required." });
        }
        try {
            const create = RotasRep_1.rotasRep.create({
                uuid,
                altitude,
                latitude,
                longitude
            });
            await RotasRep_1.rotasRep.save(create);
            return res.status(201).json(create);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error fetching: ', error });
        }
    }
    async findBy(req, res) {
        const uuid = req.query.uuid;
        try {
            const rotas = await RotasRep_1.rotasRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
            if (rotas.length === 0) {
                return res.status(200).json({ message: "No records found." });
            }
            return res.json(rotas);
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
    async findAll(req, res) {
        try {
            const rotas = await RotasRep_1.rotasRep.find({ order: { id: 'ASC' } });
            if (rotas.length === 0) {
                return res.status(200).json({ message: "No records found." });
            }
            return res.json(rotas);
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
            const rotas = await RotasRep_1.rotasRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
            if (rotas.length === 0) {
                return res.status(404).json({ message: "No records found for the provided UUID." });
            }
            await RotasRep_1.rotasRep.remove(rotas);
            return res.status(200).json({ message: "Records deleted successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
}
exports.Rotas = Rotas;
