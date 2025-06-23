"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulesRep = void 0;
const data_source_1 = require("../data-source");
const Schedules_1 = require("../entities/Schedules");
exports.schedulesRep = data_source_1.AppDataSource.getRepository(Schedules_1.Schedules);
