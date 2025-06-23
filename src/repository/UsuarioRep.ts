import { AppDataSource } from '../data-source'
import { Usuario } from '../domain/Usuario'

export const UsuarioRep = AppDataSource.getRepository(Usuario);