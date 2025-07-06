import { NoticiasController } from '../application/NoticiaController';
import { UsuarioController } from '../application/UsuarioController';
import { Authentication } from '../application/Authentication';
import { RoleController } from '../application/RoleController';
import { required } from '../middlewares/login';
import { Router } from 'express';

import { CategoriaController } from '../application/CategoriaController';
import { EmpregoController } from '../application/EmpregoController';
import { WeatherController } from '../application/WeatherController';
import { CidadeController } from '../application/CidadeController';
import { EstadoController } from '../application/EstadoController';

const routes = Router();

const authentication = new Authentication();
const usuario = new UsuarioController();
const roles = new RoleController();

const estados  = new EstadoController();
const cidades  = new CidadeController();
const noticias = new NoticiasController();
const empregos = new EmpregoController();
const weathers = new WeatherController();
const categorias = new CategoriaController();

//Login authentication
routes.post('/auth/login',          authentication.login);

//Usuario
routes.post('/v1/usuario/create',   usuario.create);
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

//Categorias
routes.get('/v1/categorias/findall',   categorias.findall);
routes.post('/v1/categorias/create',   required, categorias.create);
routes.put('/v1/categorias/update',    required, categorias.update);
routes.delete('/v1/categorias/delete', required, categorias.delete);

//Noticias
routes.get('/v1/noticias/findall',   noticias.findall);
routes.post('/v1/noticias/create',   required, noticias.create);
routes.put('/v1/noticias/update',    required, noticias.update);
routes.delete('/v1/noticias/delete', required, noticias.delete);

//Empregos
routes.get('/v1/empregos/findall',   empregos.findall);
routes.post('/v1/empregos/create',   required, empregos.create);
routes.put('/v1/empregos/update',    required, empregos.update);
routes.delete('/v1/empregos/delete', required, empregos.delete);

//Weathers
routes.get('/v1/weathers/findall',   weathers.findall);
routes.post('/v1/weathers/create',   required, weathers.create);
routes.put('/v1/weathers/update',    required, weathers.update);
routes.delete('/v1/weathers/delete', required, weathers.delete);

export default routes