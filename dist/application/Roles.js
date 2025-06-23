"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const RolesRep_1 = require("../repository/RolesRep");
const UsuarioRep_1 = require("../repository/UsuarioRep");
class Roles {
    async create(req, res) {
        const { permission } = req.body;
        if (!permission) {
            return res.status(400).json({ message: "Fields ( permission ) is required." });
        }
        const create = RolesRep_1.rolesRep.create({
            permission
        });
        await RolesRep_1.rolesRep.save(create);
        return res.status(201).json(create);
    }
    async delete(req, res) {
        const { uuid } = req.body;
        if (!uuid)
            return res.status(400).json({ message: "Field (uuid) is required." });
        const role = await RolesRep_1.rolesRep.findOne({ where: { uuid: Number(uuid) } });
        if (!role)
            return res.status(400).json({ message: "Role not found." });
        const userWithRole = await UsuarioRep_1.usuarioRep.createQueryBuilder('usuario')
            .leftJoin('usuario.roles', 'role')
            .where('role.uuid = :uuid', { uuid: Number(uuid) })
            .getOne();
        if (userWithRole) {
            return res.status(400).json({ message: "You cannot delete a role that is in use." });
        }
        await RolesRep_1.rolesRep.delete({ uuid: Number(uuid) });
        return res.status(200).json({ message: `Role with uuid ${uuid} deleted successfully.` });
    }
    async findAll(req, res) {
        const { uuid } = req.body;
        const roles = await RolesRep_1.rolesRep.find({
            order: {
                permission: 'ASC',
            },
        });
        if (!roles)
            return res.status(200).json({ message: "No records found." });
        return res.json(roles);
    }
}
exports.Roles = Roles;
