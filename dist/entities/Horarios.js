"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horarios = void 0;
const typeorm_1 = require("typeorm");
let Horarios = class Horarios {
};
exports.Horarios = Horarios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'ID' }),
    __metadata("design:type", Number)
], Horarios.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'UUID', type: 'uuid' }),
    __metadata("design:type", String)
], Horarios.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SAIDA', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], Horarios.prototype, "saida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CHEGADA', type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], Horarios.prototype, "chegada", void 0);
exports.Horarios = Horarios = __decorate([
    (0, typeorm_1.Entity)('HORARIOS')
], Horarios);
