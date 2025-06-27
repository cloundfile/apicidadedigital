import { EstadoRep } from '../repository/EstadoRep';
import { AppDataSource } from '../data-source';

import { Request, Response } from 'express';

export class EstadoController {
    async create(req: Request, res: Response) {
        const { descricao, sigla} = req.body;
        if (!descricao || !sigla) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const unique = await EstadoRep.findOneBy({ descricao: descricao });
            if (unique) {
                return res.status(400).json({ message: 'News already registered for estado.' });
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_ESTADO.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;

            const estado = EstadoRep.create({
                seq: nextSeq,
                descricao,
                sigla
            });

            await EstadoRep.save(estado);
            return res.status(201).json('Registered successfully!');
        } catch (error) {
            console.error("Creating user error:", error);
            return res.status(500).json({ message: 'Creating error', error: error });
        } finally {
            console.log('Registered successfully!');
        }
    }

    async update(req: Request, res: Response) {
         const { seq, descricao, sigla } = req.body;
        if ( !seq ||  !descricao || !sigla) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        if (isNaN(seq)) {
            return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
        }

        try {
        const estado = await EstadoRep.findOne({
            where: { seq }
        });

        if (!estado) {
            return res.status(404).json({ message: "Not found." });
        }
        if(estado.descricao) estado.descricao = descricao;
        if(estado.sigla) estado.sigla = sigla;   

        await EstadoRep.save(estado);

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

            const estado = await EstadoRep.findOne({ where: { seq } });

            if (!estado) {
                return res.status(404).json({ message: "Not found." });
            }

            await EstadoRep.delete({ seq });

            return res.status(200).json({ message: "Successfully deleted." });

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user", error: error });
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const estado = await EstadoRep.find({ 
                order: { descricao: 'ASC' },
            });

            if (!estado || estado.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            return res.json(estado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users", error: error });
        }
    }
}