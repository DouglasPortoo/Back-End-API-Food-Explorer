const { Router } = require('express')

const pratosControllers  = require('../controllers/PratosControllers')

const ensureAuth = require("../middlewares/ensureAuthenticated")

const pratosRouter = Router()
pratosRouter.use(ensureAuth)

pratosRouter.post('/', pratosControllers.create)
pratosRouter.get('/:id', pratosControllers.show)

module.exports = pratosRouter