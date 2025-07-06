import { CategoriaRep } from '../repository/CategoriaRep';
import { AppDataSource } from '../data-source';

import { Request, Response } from 'express';

export class CategoriaController {
    async create(req: Request, res: Response) {
        const { title, icone, cidadeId } = req.body;
        if (!title || !icone || !cidadeId) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const unique = await CategoriaRep.findOneBy({ title: title });
            if (unique) {
                return res.status(400).json({ message: 'Already registered.' });
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_CATEGORIA.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;

            const categoria = CategoriaRep.create({
                seq: nextSeq,
                title,
                icone,
                cidadeId
            });

            await CategoriaRep.save(categoria);
            return res.status(201).json('Registered successfully!');
        } catch (error) {
            console.error("Creating user error:", error);
            return res.status(500).json({ message: 'Creating error', error: error });
        } finally {
            console.log('Registered successfully!');
        }
    }

    async update(req: Request, res: Response) {
        const { seq, title, icone, cidadeId } = req.body;
        if ( !seq || !title || !icone || !cidadeId) {
            return res.status(400).json({ message: "Fields with * required." });
        }        
        if (isNaN(seq)) {
            return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
        }

        try {
        const categoria = await CategoriaRep.findOne({
            where: { seq }
        });

        if (!categoria) {
            return res.status(404).json({ message: "Not found." });
        }
        if(title)    categoria.title  = title;
        if(icone)    categoria.icone  = icone;
        if(cidadeId) categoria.cidadeId = cidadeId   

        await CategoriaRep.save(categoria);

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
            await CategoriaRep.delete({ seq: Number(seq) });
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

            const categoria = await CategoriaRep.find({
                relations: ['cidade'],
                where: { cidadeId: seq },
                order: { title: 'ASC' }
            });

            if (!categoria || categoria.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }
            return res.json(categoria);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching news", error: error });
        }
    }
}