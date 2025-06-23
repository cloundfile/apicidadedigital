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
exports.Schedules = void 0;
const typeorm_1 = require("typeorm");
let Schedules = class Schedules {
};
exports.Schedules = Schedules;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'ID' }),
    __metadata("design:type", Number)
], Schedules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CODIGO' }),
    __metadata("design:type", String)
], Schedules.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PARTIDA' }),
    __metadata("design:type", String)
], Schedules.prototype, "partida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CHEGADA' }),
    __metadata("design:type", String)
], Schedules.prototype, "chegada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'RETORNO' }),
    __metadata("design:type", String)
], Schedules.prototype, "retorno", void 0);
exports.Schedules = Schedules = __decorate([
    (0, typeorm_1.Entity)('SCHEDULES')
], Schedules);
