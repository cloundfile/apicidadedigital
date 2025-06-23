import { AppDataSource } from '../data-source'
import { UsuarioRole } from '../domain/UsuarioRole'

export const UsuarioRoleRep = AppDataSource.getRepository(UsuarioRole);