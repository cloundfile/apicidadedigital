"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NoticiaController_1 = require("../application/NoticiaController");
const UsuarioController_1 = require("../application/UsuarioController");
const Authentication_1 = require("../application/Authentication");
const RoleController_1 = require("../application/RoleController");
const login_1 = require("../middlewares/login");
const express_1 = require("express");
const ServicoController_1 = require("../application/ServicoController");
const CidadeController_1 = require("../application/CidadeController");
const EstadoController_1 = require("../application/EstadoController");
const EmpregoController_1 = require("../application/EmpregoController");
const routes = (0, express_1.Router)();
const authentication = new Authentication_1.Authentication();
const usuario = new UsuarioController_1.UsuarioController();
const roles = new RoleController_1.RoleController();
const servicos = new ServicoController_1.ServicoController();
const estados = new EstadoController_1.EstadoController();
const cidades = new CidadeController_1.CidadeController();
const noticias = new NoticiaController_1.NoticiasController();
const empregos = new EmpregoController_1.EmpregoController();
//Login authentication
routes.post('/auth/login', authentication.login);
//Usuario
routes.post('/v1/usuario/create', usuario.create);
routes.put('/v1/usuario/update', login_1.required, usuario.update);
routes.delete('/v1/usuario/delete', login_1.required, usuario.delete);
routes.get('/v1/usuario/findall', login_1.required, usuario.findall);
//Roles
routes.get('/v1/roles/findall', login_1.required, roles.findAll);
routes.post('/v1/roles/create', login_1.required, roles.create);
routes.put('/v1/roles/update', login_1.required, roles.update);
routes.delete('/v1/roles/delete', login_1.required, roles.delete);
//Estados
routes.get('/v1/estados/findall', estados.findall);
routes.post('/v1/estados/create', login_1.required, estados.create);
routes.put('/v1/estados/update', login_1.required, estados.update);
routes.delete('/v1/estados/delete', login_1.required, estados.delete);
//Cidades
routes.get('/v1/cidades/findall', cidades.findall);
routes.post('/v1/cidades/create', login_1.required, cidades.create);
routes.put('/v1/cidades/update', login_1.required, cidades.update);
routes.delete('/v1/cidades/delete', login_1.required, cidades.delete);
//Servicos
routes.get('/v1/servicos/findall', servicos.findall);
routes.post('/v1/servicos/create', login_1.required, servicos.create);
routes.put('/v1/servicos/update', login_1.required, servicos.update);
routes.delete('/v1/servicos/delete', login_1.required, servicos.delete);
//Noticias
routes.get('/v1/noticias/findall', noticias.findall);
routes.post('/v1/noticias/create', login_1.required, noticias.create);
routes.put('/v1/noticias/update', login_1.required, noticias.update);
routes.delete('/v1/noticias/delete', login_1.required, noticias.delete);
//Empregos
routes.get('/v1/empregos/findall', empregos.findall);
routes.post('/v1/empregos/create', login_1.required, empregos.create);
routes.put('/v1/empregos/update', login_1.required, empregos.update);
routes.delete('/v1/empregos/delete', login_1.required, empregos.delete);
exports.default = routes;
