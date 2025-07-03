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
exports.Empresa = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Cidade_1 = require("./Cidade");
let Empresa = class Empresa {
};
exports.Empresa = Empresa;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'SEQ', type: 'number', precision: 19, scale: 0 }),
    __metadata("design:type", Number)
], Empresa.prototype, "seq", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CNPJ', type: 'number' }),
    __metadata("design:type", Number)
], Empresa.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TITLE', type: 'varchar2', length: 100 }),
    __metadata("design:type", String)
], Empresa.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCRIPTION', type: 'varchar2', length: 255 }),
    __metadata("design:type", String)
], Empresa.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'THUMBNAIL', type: 'varchar2', length: 255 }),
    __metadata("design:type", String)
], Empresa.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ADDRESS', type: 'varchar2', length: 255 }),
    __metadata("design:type", String)
], Empresa.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'EMAIL', type: 'varchar2', length: 255 }),
    __metadata("design:type", String)
], Empresa.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SITE', type: 'varchar2', length: 100 }),
    __metadata("design:type", String)
], Empresa.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PHONE', type: 'number' }),
    __metadata("design:type", Number)
], Empresa.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LATITUDE', type: 'number', precision: 19, scale: 0 }),
    __metadata("design:type", Number)
], Empresa.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LONGITUDE', type: 'number', precision: 19, scale: 0 }),
    __metadata("design:type", Number)
], Empresa.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'USUARIO', referencedColumnName: 'seq' }),
    __metadata("design:type", Usuario_1.Usuario)
], Empresa.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cidade_1.Cidade),
    (0, typeorm_1.JoinColumn)({ name: 'CIDADE', referencedColumnName: 'seq' }),
    __metadata("design:type", Cidade_1.Cidade)
], Empresa.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'PUBLISH', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Empresa.prototype, "publish", void 0);
exports.Empresa = Empresa = __decorate([
    (0, typeorm_1.Entity)('CIDADE')
], Empresa);
