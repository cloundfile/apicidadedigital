"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkRep = void 0;
const data_source_1 = require("../data-source");
const Chunks_1 = require("../entities/Chunks");
exports.chunkRep = data_source_1.AppDataSource.getRepository(Chunks_1.Chunks);
