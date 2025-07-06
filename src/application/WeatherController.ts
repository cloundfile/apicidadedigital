import { WeatherRep } from '../repository/WeatherRep';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export class WeatherController {
    async create(req: Request, res: Response) {
        const { icon, temp, max, min, cidadeId } = req.body;
        if (!icon || !temp || !max || !min || !cidadeId) {
            return res.status(400).json({ message: "Fields with ( icon, temp, max, min, cidadeId ) required." });
        }
        try {
            const unique = await WeatherRep.findOneBy({ cidadeId });
            if (unique) {
                  const updateData = {
                    seq: unique.seq,
                    icon,
                    temp,
                    max,
                    min,
                    cidadeId
                };
                return this.update(req, res, updateData);
            }

            const seqResult = await AppDataSource.query(`SELECT SEQ_WEATHER.NEXTVAL AS SEQ FROM DUAL`);
            const nextSeq = seqResult[0].SEQ;

            const weather = WeatherRep.create({
                seq: nextSeq,
                icon,
                temp,
                max,
                min,
                cidadeId: cidadeId
            });

            await WeatherRep.save( weather);
            return res.status(201).json('Registered successfully!');
        } catch (error) {
            return res.status(500).json({ message: 'Creating error', error: error });
        } finally {
            console.log('Registered successfully!');
        }
    }

    async update(req: Request, res: Response, updateData?: any) {
        const { seq, icon, temp, max, min, cidadeId } = updateData || req.body;

        if ( !seq || !icon || !temp || !max || !min || !cidadeId ) {
            return res.status(400).json({ message: "Fields with ( seq, icon, temp, max, min, cidadeId ) required." });
        }   
            
        if (isNaN(seq)) {
            return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
        }

        try {
        const weather = await WeatherRep.findOne({
            where: { cidadeId  }
        });

        if (!weather) {
            return res.status(404).json({ message: "Not found." });
        }
        if(icon) weather.icon  = icon;
        if(temp) weather.temp  = temp;
        if(max)  weather.max   = max;
        if(min)  weather.min   = min;

        await WeatherRep.save(weather);

        return res.status(200).json('Updated successfully!');

        } catch (error) {
            return res.status(500).json({ message: "Error updating user", error: error });
        } finally {
            console.log("User update completed.");
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const seq = Number(req.params.seq);
            if (isNaN(seq)) {
                return res.status(400).json({ message: "Invalid or missing 'seq' parameter." });
            }

            const weather = await WeatherRep.findOne({ where: { seq: Number(seq) } });

            if (!weather) {
                return res.status(404).json({ message: "Not found." });
            }

            await WeatherRep.delete({ seq: Number(seq) });

            return res.status(200).json({ message: "Successfully deleted." });

        } catch (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ message: "Error deleting user", error: error });
        }
    }

    async findall(req: Request, res: Response) {
        try {
            const cidadeId = Number(req.query.cidade);
            if (isNaN(cidadeId)) {
                return res.status(400).json({ message: "Invalid or missing 'cidade' parameter." });
            }

            const weather = await WeatherRep.findOne({
                relations: ['cidade'],
                where: { cidadeId }
            });

            if (!weather) {
                return res.status(404).json({ message: "No records found." });
            }

            return res.json(weather);

        } catch (error) {
            return res.status(500).json({ message: "Error fetching news", error: error });
        }
    }
}