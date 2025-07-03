"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaRep = void 0;
const data_source_1 = require("../data-source");
const Empresa_1 = require("../domain/Empresa");
exports.EmpresaRep = data_source_1.AppDataSource.getRepository(Empresa_1.Empresa);
