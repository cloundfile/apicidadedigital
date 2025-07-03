import { ServicoRep } from '../repository/ServicoRep';
import { AppDataSource } from '../data-source';

import { Request, Response } from 'express';

export class ServicoController {
    async create(req: Request, res: Response) {
        const { title, icone, cidade } = req.body;
        if (!title || !icone || !cidade) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const unique = await ServicoRep.findOneBy({ title: title });
            if (unique) {
                return res.status(400).json({ message: 'Already registered.' });
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_SERVICO.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;

            const servico = ServicoRep.create({
                seq: nextSeq,
                title,
                icone,
                cidadeId: cidade
            });

            await ServicoRep.save(servico);
            return res.status(201).json('Registered successfully!');
        } catch (error) {
            console.error("Creating user error:", error);
            return res.status(500).json({ message: 'Creating error', error: error });
        } finally {
            console.log('Registered successfully!');
        }
    }

    async update(req: Request, res: Response) {
        const { seq, title, icone, cidade } = req.body;
        if ( !seq || !title || !icone || !cidade) {
            return res.status(400).json({ message: "Fields with * required." });
        }        
        if (isNaN(seq)) {
            return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
        }

        try {
        const servico = await ServicoRep.findOne({
            where: { seq }
        });

        if (!servico) {
            return res.status(404).json({ message: "Not found." });
        }
        servico.title  = title;
        servico.icone  = icone;
        servico.cidadeId = cidade   

        await ServicoRep.save(servico);

        return res.status(200).json('Updated successfully!');

        } catch (error) {
            return res.status(500).json({ message: "Error updating user", error: error });
        } finally {
            console.log("User update completed.");
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const seq = Number(req.params.seq);
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
            }

            const servico = await ServicoRep.findOne({ where: { seq: Number(seq) } });

            if (!servico) {
                return res.status(404).json({ message: "Not found." });
            }

            await ServicoRep.delete({ seq: Number(seq) });

            return res.status(200).json({ message: "Successfully deleted." });

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user", error: error });
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const seq = Number(req.query.cidade);
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'cidade' parameter." });
            }

            const servicos = await ServicoRep.find({
                relations: ['cidade'],
                where: { cidadeId: seq },
                order: { title: 'ASC' }
            });

            if (!servicos || servicos.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            return res.json(servicos);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching news", error: error });
        }
    }
}