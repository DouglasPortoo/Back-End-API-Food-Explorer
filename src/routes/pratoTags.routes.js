const { Router } = require('express')

const pratoTagControllers  = require('../controllers/PratoTagsControllers')

const ensureAuth = require("../middlewares/ensureAuthenticated")

const pratoTagsRouter = Router()
pratoTagsRouter.use(ensureAuth)

pratoTagsRouter.get('/', pratoTagControllers.index)

module.exports = pratoTagsRouter