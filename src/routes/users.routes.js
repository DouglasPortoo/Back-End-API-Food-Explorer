const { Router } = require("express");

//Controllers
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();


usersRoutes.post("/", usersController.create);


module.exports = usersRoutes;