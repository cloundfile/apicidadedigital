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
exports.Usuarios = void 0;
const typeorm_1 = require("typeorm");
const Roles_1 = require("./Roles");
let Usuarios = class Usuarios {
};
exports.Usuarios = Usuarios;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'UUID' }),
    __metadata("design:type", Number)
], Usuarios.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'USERNAME' }),
    __metadata("design:type", String)
], Usuarios.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'PASSWORD' }),
    __metadata("design:type", String)
], Usuarios.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Roles_1.Roles),
    (0, typeorm_1.JoinTable)({
        name: 'USUARIOS_ROLES',
        joinColumn: { name: 'USUARIOS_UUID', referencedColumnName: 'uuid' },
        inverseJoinColumn: { name: 'ROLE_UUID', referencedColumnName: 'uuid' }
    }),
    __metadata("design:type", Array)
], Usuarios.prototype, "roles", void 0);
exports.Usuarios = Usuarios = __decorate([
    (0, typeorm_1.Entity)('USUARIOS')
], Usuarios);
