"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const UsuarioRep_1 = require("../repository/UsuarioRep");
const RolesRep_1 = require("../repository/RolesRep");
const bcrypt = require('bcryptjs');
class Usuario {
    async create(req, res) {
        const { username, password, roles } = req.body;
        if (!username || !password || !roles) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        const criptpass = bcrypt.hashSync(password, 10);
        try {
            const unavailable = await UsuarioRep_1.usuarioRep.findOneBy({ username: String(username) });
            if (unavailable) {
                return res.status(400).json({ message: "Username unavailable." });
            }
            const roleEntities = await RolesRep_1.rolesRep.findByIds(roles);
            if (roleEntities.length !== roles.length) {
                return res.status(400).json({ message: "Some roles not found." });
            }
            const usuario = UsuarioRep_1.usuarioRep.create({
                username,
                password: criptpass,
                roles: roleEntities
            });
            await UsuarioRep_1.usuarioRep.save(usuario);
            return res.status(201).json({ username: usuario.username, roles: usuario.roles.map(role => role.permission) });
        }
        catch (error) {
            return res.status(500).json({ message: "Error creating user", error });
        }
        finally {
            console.log('request completed successfully');
        }
    }
    async update(req, res) {
        const { uuid, username, password, roles } = req.body;
        if (!username || !roles) {
            return res.status(400).json({ message: "Fields with * required." });
        }
        let criptpass;
        if (password) {
            criptpass = bcrypt.hashSync(password, 10);
        }
        try {
            const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid });
            if (!usuario) {
                return res.status(400).json({ message: "User not found." });
            }
            const roleEntities = await RolesRep_1.rolesRep.findByIds(roles);
            if (roleEntities.length !== roles.length) {
                return res.status(400).json({ message: "Some roles not found." });
            }
            usuario.username = username;
            if (criptpass) {
                usuario.password = criptpass;
            }
            usuario.roles = roleEntities;
            await UsuarioRep_1.usuarioRep.save(usuario);
            return res.status(200).json({ uuid: usuario.uuid, username: usuario.username, roles: usuario.roles.map(role => role.permission) });
        }
        catch (error) {
            return res.status(500).json({ message: "Error updating user", error });
        }
        finally {
            console.log('request completed successfully');
        }
    }
    async delete(req, res) {
        const { uuid } = req.body;
        if (!uuid)
            return res.status(400).json({ message: "Mandatory UUID." });
        const usuario = await UsuarioRep_1.usuarioRep.findOneBy({ uuid: Number(uuid) });
        if (!usuario)
            return res.status(400).json({ message: "UUID not found." });
        await UsuarioRep_1.usuarioRep.delete(uuid);
        return res.status(201).json({ message: usuario?.username + " Successfully deleted." });
    }
    async findall(req, res) {
        const usuarios = await UsuarioRep_1.usuarioRep.find({
            relations: ['roles'],
            order: {
                username: 'ASC',
            }
        });
        if (!usuarios || usuarios.length === 0) {
            return res.status(400).json({ message: "No records found." });
        }
        const response = usuarios.map((usuario) => {
            const rolesPermissions = usuario.roles.map(role => role.permission);
            return {
                uuid: usuario.uuid,
                username: usuario.username,
                roles: rolesPermissions.length > 0 ? rolesPermissions : null
            };
        });
        return res.json(response);
    }
}
exports.Usuario = Usuario;
