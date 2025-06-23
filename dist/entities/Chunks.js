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
exports.Chunks = void 0;
const typeorm_1 = require("typeorm");
let Chunks = class Chunks {
};
exports.Chunks = Chunks;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'ID' }),
    __metadata("design:type", Number)
], Chunks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'UUID' }),
    __metadata("design:type", String)
], Chunks.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'LANGUAGE' }),
    __metadata("design:type", String)
], Chunks.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TIMESTAMP' }),
    __metadata("design:type", String)
], Chunks.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TEXT' }),
    __metadata("design:type", String)
], Chunks.prototype, "text", void 0);
exports.Chunks = Chunks = __decorate([
    (0, typeorm_1.Entity)('CHUNKS')
], Chunks);
