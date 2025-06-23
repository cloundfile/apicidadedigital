"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pontosRep = void 0;
const data_source_1 = require("../data-source");
const Pontos_1 = require("../entities/Pontos");
exports.pontosRep = data_source_1.AppDataSource.getRepository(Pontos_1.Pontos);
