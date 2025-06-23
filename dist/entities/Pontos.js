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
exports.Pontos = void 0;
const typeorm_1 = require("typeorm");
let Pontos = class Pontos {
};
exports.Pontos = Pontos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'ID' }),
    __metadata("design:type", Number)
], Pontos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'UUID', type: 'uuid' }),
    __metadata("design:type", String)
], Pontos.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCRIPTION' }),
    __metadata("design:type", Number)
], Pontos.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ADDRESS' }),
    __metadata("design:type", Number)
], Pontos.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LATITUDE', type: 'float', precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Pontos.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LONGITUDE', type: 'float', precision: 10, scale: 6 }),
    __metadata("design:type", Number)
], Pontos.prototype, "longitude", void 0);
exports.Pontos = Pontos = __decorate([
    (0, typeorm_1.Entity)('PONTOS')
], Pontos);
