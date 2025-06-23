import { AppDataSource } from '../data-source'
import { Estado } from '../domain/Estado'

export const EstadoRep = AppDataSource.getRepository(Estado);