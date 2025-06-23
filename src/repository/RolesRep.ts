import { AppDataSource } from '../data-source'
import { Role } from '../domain/Role'

export const RolesRep = AppDataSource.getRepository(Role);