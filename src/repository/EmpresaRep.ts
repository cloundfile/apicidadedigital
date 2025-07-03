import { AppDataSource } from '../data-source'
import { Empresa } from '../domain/Empresa'

export const EmpresaRep = AppDataSource.getRepository(Empresa);