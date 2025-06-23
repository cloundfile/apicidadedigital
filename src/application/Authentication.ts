import { UsuarioRep } from '../repository/UsuarioRep';
import { createToken } from "../utils/jwtManager"
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class Authentication {
    async login(req: Request, res: Response) {        
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ 
                message: 'Username and Password are required.'
            });
        }
    
        try {
            const usuario = await UsuarioRep.findOne({
                where: { username: String(username) },
                relations: ['roles'],
            });

            if (!usuario) {
                return res.status(403).json({
                    message: 'Unauthorized: Incorrect username or password.'
                });
            }

            const authenticated = await bcrypt.compare(password, usuario.password);
            if (!authenticated) {
                return res.status(403).json({
                    message: 'Unauthorized: Incorrect username or password.'
                });
            }

            const token = createToken({ uuid: usuario.seq, username: usuario.username });
            const rolesPermissions = usuario.roles.map(role => role.descricao);

            return res.status(200).json({
                usuario: usuario.username,
                roles: rolesPermissions, 
                token,
            });
        } catch (error) {
            console.error("Error authenticating user:", error);
            return res.status(500).json({ message: "Error authenticating user", error: error });
        }  
    }
}