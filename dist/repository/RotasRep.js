"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotasRep = void 0;
const data_source_1 = require("../data-source");
const Rotas_1 = require("../entities/Rotas");
exports.rotasRep = data_source_1.AppDataSource.getRepository(Rotas_1.Rotas);
