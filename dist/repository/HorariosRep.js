"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horariosRep = void 0;
const data_source_1 = require("../data-source");
const Horarios_1 = require("../entities/Horarios");
exports.horariosRep = data_source_1.AppDataSource.getRepository(Horarios_1.Horarios);
