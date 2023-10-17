const {Router} = require("express")

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const pratosRouter = require('./pratos.routes')


const routes = Router()

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

routes.use("/pratos", pratosRouter)

module.exports=routes;