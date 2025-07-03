"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoController = void 0;
const ServicoRep_1 = require("../repository/ServicoRep");
const data_source_1 = require("../data-source");
class ServicoController {
    async create(req, res) {
        const { title, icone, cidade } = req.body;
        if (!title || !icone || !cidade) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const unique = await ServicoRep_1.ServicoRep.findOneBy({ title: title });
            if (unique) {
                return res.status(400).json({ message: 'Already registered.' });
            }
            const seqResult = await data_source_1.AppDataSource.query(`SELECT SEQ_SERVICO.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;
            const servico = ServicoRep_1.ServicoRep.create({
                seq: nextSeq,
                title,
                icone,
                cidadeId: cidade
            });
            await ServicoRep_1.ServicoRep.save(servico);
            return res.status(201).json('Registered successfully!');
        }
        catch (error) {
            console.error("Creating user error:", error);
            return res.status(500).json({ message: 'Creating error', error: error });
        }
        finally {
            console.log('Registered successfully!');
        }
    }
    async update(req, res) {
        const { seq, title, icone, cidade } = req.body;
        if (!seq || !title || !icone || !cidade) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        if (isNaN(seq)) {
            return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
        }
        try {
            const servico = await ServicoRep_1.ServicoRep.findOne({
                where: { seq }
            });
            if (!servico) {
                return res.status(404).json({ message: "Not found." });
            }
            servico.title = title;
            servico.icone = icone;
            servico.cidadeId = cidade;
            await ServicoRep_1.ServicoRep.save(servico);
            return res.status(200).json('Updated successfully!');
        }
        catch (error) {
            return res.status(500).json({ message: "Error updating user", error: error });
        }
        finally {
            console.log("User update completed.");
        }
    }
    async delete(req, res) {
        try {
            const seq = Number(req.params.seq);
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
            }
            const servico = await ServicoRep_1.ServicoRep.findOne({ where: { seq: Number(seq) } });
            if (!servico) {
                return res.status(404).json({ message: "Not found." });
            }
            await ServicoRep_1.ServicoRep.delete({ seq: Number(seq) });
            return res.status(200).json({ message: "Successfully deleted." });
        }
        catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user", error: error });
        }
    }
    async findall(req, res) {
        try {
            const seq = Number(req.query.cidade);
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'cidade' parameter." });
            }
            const servicos = await ServicoRep_1.ServicoRep.find({
                relations: ['cidade'],
                where: { cidadeId: seq },
                order: { title: 'ASC' }
            });
            if (!servicos || servicos.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }
            return res.json(servicos);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching news", error: error });
        }
    }
}
exports.ServicoController = ServicoController;
