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
exports.Noticia = void 0;
const typeorm_1 = require("typeorm");
const Cidade_1 = require("./Cidade");
const class_transformer_1 = require("class-transformer");
let Noticia = class Noticia {
};
exports.Noticia = Noticia;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'SEQ', type: 'number', precision: 19, scale: 2 }),
    __metadata("design:type", Number)
], Noticia.prototype, "seq", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TITLE', type: 'varchar2', length: 255 }),
    __metadata("design:type", String)
], Noticia.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'THUMBNAIL', type: 'varchar2', length: 255 }),
    __metadata("design:type", String)
], Noticia.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCRICAO', type: 'clob' }),
    __metadata("design:type", String)
], Noticia.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CIDADE_ID', type: 'number', precision: 19, scale: 2 }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], Noticia.prototype, "cidadeId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'CADASTRADO', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Noticia.prototype, "cadastrado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cidade_1.Cidade),
    (0, typeorm_1.JoinColumn)({ name: 'CIDADE_ID', referencedColumnName: 'seq' }),
    __metadata("design:type", Cidade_1.Cidade)
], Noticia.prototype, "cidade", void 0);
exports.Noticia = Noticia = __decorate([
    (0, typeorm_1.Entity)('NOTICIA')
], Noticia);
