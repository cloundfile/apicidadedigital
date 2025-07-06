import { AppDataSource } from '../data-source'
import { Weather } from '../domain/Weather'

export const WeatherRep = AppDataSource.getRepository(Weather);