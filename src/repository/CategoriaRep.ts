import { AppDataSource } from '../data-source'
import { Categoria } from '../domain/Categoria';

export const CategoriaRep = AppDataSource.getRepository(Categoria);