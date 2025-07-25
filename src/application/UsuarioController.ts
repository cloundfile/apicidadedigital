import { UsuarioRep } from '../repository/UsuarioRep';
import { RolesRep } from '../repository/RolesRep';
import { AppDataSource } from '../data-source';

import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class UsuarioController {
    async create(req: Request, res: Response) {
        const { fullname, username, password, email, phone, cidadeId, roles } = req.body;
        if (!fullname || !username || !password || !email || !phone || !cidadeId || !roles) {
            return res.status(400).json({ message: "Fields with fulname, username, password, email, phone, cidade, roles as required." });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            const existing = await UsuarioRep.findOneBy({ username: String(username) });
            if (existing) {
                return res.status(400).json({ message: 'Username unavailable.' });
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_USUARIO.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = Number(seqResult?.[0]?.SEQ);
            if (!nextSeq) {
                return res.status(500).json({ message: "Error retrieving sequence." });
            }

            const roleEntities = await Promise.all(
                roles.map(async (item: { id: number }) => {
                const role = await RolesRep.findOneBy({ seq: item.id });
                if (!role) throw new Error(`Role ID ${item.id} not found`);
                    return role;
                })
            );

            const usuario = UsuarioRep.create({
                seq: nextSeq,
                fullname,
                username,
                password: hashedPassword,
                email,
                phone,
                cidadeId: cidadeId,
                roles: roleEntities,
            });

            await UsuarioRep.save(usuario);

            return res.status(201).json({
                username: usuario.username,
                roles: usuario.roles.map(role => role.descricao),
            });
        } catch (error) {
            console.error("Creating user error:", error);
            return res.status(500).json({ message: 'Creating error', error: error });
        } finally {
            console.log('User creation request processed.');
        }
    }

    async update(req: Request, res: Response) {
        const { seq, fullname, username, password, email, phone, roles } = req.body;

        if (!seq || !fullname || !username || !password || !email || !phone || !roles || !Array.isArray(roles)) {
            return res.status(400).json({ message: "Fields with seq, fullname, username, password, email, phone, cidade, roles as required and roles must be an array." });
        }

        try {
        const usuario = await UsuarioRep.findOne({
            where: { seq },
            relations: ['roles'],
        });

        if(!usuario) return res.status(404).json({ message: "User not found." });

        if(email)       usuario.email = email;
        if(phone)       usuario.phone = phone;
        if(username)    usuario.username = username;
        if(fullname)    usuario.fullname = fullname;
        if(password)    usuario.password = bcrypt.hashSync(password, 10);

        const roleEntities = await Promise.all(
            roles.map(async (r: { id: number }) => {
            const role = await RolesRep.findOneBy({ seq: r.id });
            if (!role) throw new Error(`Role with ID ${r.id} not found.`);
            return role;
            })
        );

        usuario.roles = roleEntities;

        await UsuarioRep.save(usuario);

        return res.status(200).json({
            seq: usuario.seq,
            email: usuario.email,
            phone: usuario.phone,
            username: usuario.username,
            fullname: usuario.fullname,
            roles: usuario.roles.map(role => role.descricao),
        });

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

            const seqNum = Number(seq);
            if (isNaN(seqNum)) {
                return res.status(400).json({ message: "Invalid ID format." });
            }

            const usuario = await UsuarioRep.findOne({ where: { seq } });

            if (!usuario) {
                return res.status(404).json({ message: "User not found." });
            }

            await UsuarioRep.delete({ seq: seqNum });

            return res.status(200).json({ message: "Successfully deleted." });

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user", error: error });
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const usuarios = await UsuarioRep.find({ 
                relations: ['roles', 'cidade'],
                order: { username: 'ASC' },
            });            

            if (!usuarios || usuarios.length === 0) {
                return res.status(404).json({ message: "No records found." });
            }

            const response = usuarios.map(usuario => ({
                seq: usuario.seq,
                phone: usuario.phone,
                email: usuario.email,
                username: usuario.username,
                fullname: usuario.fullname,
                cidade: usuario.cidade,
                roles: usuario.roles ? usuario.roles.map(role => role.descricao) : []
            }));
            

            return res.json(response);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users", error: error });
        }
    }
}