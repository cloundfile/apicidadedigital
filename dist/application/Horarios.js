"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horarios = void 0;
const HorariosRep_1 = require("../repository/HorariosRep");
class Horarios {
    async create(req, res) {
        const { uuid, saida, chegada } = req.body;
        if (!uuid || !saida || !chegada) {
            return res.status(400).json({ message: "Fields ( uuid, saida, chegada ) is required." });
        }
        const create = HorariosRep_1.horariosRep.create({
            uuid,
            saida,
            chegada
        });
        await HorariosRep_1.horariosRep.save(create);
        return res.status(201).json(create);
    }
    async findBy(req, res) {
        const uuid = req.query.uuid;
        try {
            const response = await HorariosRep_1.horariosRep.find({
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
            const response = await HorariosRep_1.horariosRep.find({ order: { id: 'ASC' } });
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
            const response = await HorariosRep_1.horariosRep.find({
                where: { uuid: String(uuid) },
                order: { id: 'ASC' }
            });
            if (response.length === 0) {
                return res.status(404).json({ message: "No records found for the provided UUID." });
            }
            await HorariosRep_1.horariosRep.remove(response);
            return res.status(200).json({ message: "Records deleted successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: 'Request failure: ', error });
        }
    }
}
exports.Horarios = Horarios;
