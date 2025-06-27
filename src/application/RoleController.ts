
import { UsuarioRep } from '../repository/UsuarioRep';
import { RolesRep } from '../repository/RolesRep';
import { Request, Response } from 'express';

import { AppDataSource } from '../data-source';

export class RoleController {
    async create(req: Request, res: Response) {
        try {
            const { descricao } = req.body;
            
            if (!descricao) {
                return res.status(400).json({ message: "Field 'descricao' is required." });
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_ROLE.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;

            const role = RolesRep.create({ 
                seq: nextSeq,
                descricao 
            });

            await RolesRep.save(role);
            return res.status(201).json(role);

        } catch (error) {
            console.error("Error creating role:", error);
            return res.status(500).json({ message: "Error creating role", error: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { seq, descricao } = req.body; 
           

            if (!seq || !descricao) {
                return res.status(400).json({ message: "Field 'descricao' is required." });
            }
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
            }

            const role = await RolesRep.findOne({ where: { seq } });
            
            if (!role) {
                return res.status(404).json({ message: `Role with seq ${seq} not found.` });
            }
            role.descricao = descricao;
            await RolesRep.save(role);
            return res.json(role);

        } catch (error) {
            console.error("Error updating role:", error);
            return res.status(500).json({ message: "Error updating role", error: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const seq = Number(req.params.seq);
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
            }

            const role = await RolesRep.findOne({ where: { seq } });
            if (!role) {
                return res.status(404).json({ message: "Role not found." });
            }

            const userWithRole = await UsuarioRep.createQueryBuilder('usuario')
                .leftJoin('usuario.roles', 'role')
                .where('role.seq = :seq', { seq })
                .getOne();

            if (userWithRole) {
                return res.status(400).json({ message: "You cannot delete a role that is in use." });
            }

            await RolesRep.delete({ seq });

            return res.status(200).json({ message: `Role deleted successfully.` });

        } catch (error) {
            console.error("Error deleting role:", error);
            return res.status(500).json({ message: "Error deleting role", error: error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const roles = await RolesRep.find({
                order: {
                    descricao: 'ASC',
                },
            });

            if (!roles || roles.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            return res.json(roles);

        } catch (error) {
            console.error("Error fetching roles:", error);
            return res.status(500).json({ message: "Error fetching roles", error: error });
        }
    }
}

