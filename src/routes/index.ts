import { NoticiasController } from '../application/NoticiaController';
import { UsuarioController } from '../application/UsuarioController';
import { Authentication } from '../application/Authentication';
import { RoleController } from '../application/RoleController';
import { required } from '../middlewares/login';
import { Router } from 'express';

import { ServicoController } from '../application/ServicoController';
import { CidadeController } from '../application/CidadeController';
import { EstadoController } from '../application/EstadoController';
import { VagasController } from '../application/VagasController';

const routes = Router();

const authentication = new Authentication();
const usuario = new UsuarioController();
const roles = new RoleController();

const servicos = new ServicoController();
const estados = new EstadoController();
const cidades = new CidadeController();
const noticias = new NoticiasController();
const vagas = new VagasController();

//Login authentication
routes.post('/auth/login',          authentication.login);

//Usuario
routes.post('/v1/usuario/create',   required, usuario.create);
routes.put('/v1/usuario/update',    required, usuario.update);
routes.delete('/v1/usuario/delete', required, usuario.delete);
routes.get('/v1/usuario/findall',   required, usuario.findall);

//Roles
routes.get('/v1/roles/findall',   required, roles.findAll);
routes.post('/v1/roles/create',   required, roles.create);
routes.put('/v1/roles/update',    required, roles.update);
routes.delete('/v1/roles/delete', required, roles.delete);

//Estados
routes.get('/v1/estados/findall',   estados.findall);
routes.post('/v1/estados/create',   required, estados.create);
routes.put('/v1/estados/update',    required, estados.update);
routes.delete('/v1/estados/delete', required, estados.delete);

//Cidades
routes.get('/v1/cidades/findall',   cidades.findall);
routes.post('/v1/cidades/create',   required, cidades.create);
routes.put('/v1/cidades/update',    required, cidades.update);
routes.delete('/v1/cidades/delete', required, cidades.delete);

//Servicos
routes.get('/v1/servicos/findall',   servicos.findall);
routes.post('/v1/servicos/create',   required, servicos.create);
routes.put('/v1/servicos/update',    required, servicos.update);
routes.delete('/v1/servicos/delete', required, servicos.delete);

//Noticias
routes.get('/v1/noticias/findall',   noticias.findall);
routes.post('/v1/noticias/create',   required, noticias.create);
routes.put('/v1/noticias/update',    required, noticias.update);
routes.delete('/v1/noticias/delete', required, noticias.delete);

//Vagas
routes.get('/v1/vagas/findall',   vagas.findall);
routes.post('/v1/vagas/create',   required, vagas.create);
routes.put('/v1/vagas/update',    required, vagas.update);
routes.delete('/v1/vagas/delete', required, vagas.delete);


export default routes