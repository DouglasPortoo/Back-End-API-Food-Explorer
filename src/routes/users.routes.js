const { Router } = require("express");

//Controllers
const UsersController = require("../controllers/UsersController");
// const UsersValidetedController = require("../controllers/UsersValidetedController");

//Verificador de autenticação
// const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();
// const usersValidetedController = new UsersValidetedController();

usersRoutes.post("/", usersController.create);
// usersRoutes.get("/valideted",ensureAuthenticated, usersValidetedController.index);

module.exports = usersRoutes;