"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRep = void 0;
const data_source_1 = require("../data-source");
const Videos_1 = require("../entities/Videos");
exports.videoRep = data_source_1.AppDataSource.getRepository(Videos_1.Videos);
