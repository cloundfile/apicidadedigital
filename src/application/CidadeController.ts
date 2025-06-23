import { CidadeRep } from '../repository/CidadeRep';
import { AppDataSource } from '../data-source';

import { Request, Response } from 'express';

export class CidadeController {
    async create(req: Request, res: Response) {
        const { descricao, estado, dominio } = req.body;
        if (!descricao || !estado || dominio) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        try {
            const unique = await CidadeRep.findOneBy({ descricao: descricao });
            if (unique) {
                return res.status(400).json({ message: 'News already registered for cidade.' });
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_CIDADE.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;

            const cidade = CidadeRep.create({
                seq: nextSeq,
                dominio,
                descricao,
                estadoId: estado
            });

            await CidadeRep.save(cidade);
            return res.status(201).json('Registered successfully!');
        } catch (error) {
            console.error("Creating user error:", error);
            return res.status(500).json({ message: 'Creating error', error: error });
        } finally {
            console.log('Registered successfully!');
        }
    }

    async update(req: Request, res: Response) {
         const { seq, descricao, estado } = req.body;
        if ( !seq ||  !descricao || !estado) {
            return res.status(400).json({ message: "Fields with * required." });
        }

        try {
        const cidade = await CidadeRep.findOne({
            where: { seq }
        });

        if (!cidade) {
            return res.status(404).json({ message: "Not found." });
        }
        if(cidade.descricao) cidade.descricao = descricao;
        if(cidade.estadoId) cidade.estadoId = estado;   

        await CidadeRep.save(cidade);

        return res.status(200).json('Updated successfully!');

        } catch (error) {
            return res.status(500).json({ message: "Error updating user", error: error });
        } finally {
            console.log("User update completed.");
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { seq } = req.params;

            if (!seq) {
                return res.status(400).json({ message: "Mandatory ID." });
            }

            const cidade = await CidadeRep.findOne({ where: { seq: Number(seq) } });

            if (!cidade) {
                return res.status(404).json({ message: "Not found." });
            }

            await CidadeRep.delete({ seq: Number(seq) });

            return res.status(200).json({ message: "Successfully deleted." });

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user", error: error });
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const cidade = await CidadeRep.find({ 
                relations: ['estado'],
                order: { descricao: 'ASC' },
            });

            if (!cidade || cidade.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            return res.json(cidade);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users", error: error });
        }
    }
}