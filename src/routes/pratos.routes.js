const { Router } = require('express')


const multer = require('multer')
const uploadConfig = require('../configs/upload')

const pratosControllers  = require('../controllers/PratosControllers')
const pratoImgController = require('../controllers/PratoImgController')

const upload = multer(uploadConfig.MULTER)

const ensureAuth = require("../middlewares/ensureAuthenticated")

const pratosRouter = Router()
pratosRouter.use(ensureAuth)

pratosRouter.post('/', pratosControllers.create)
pratosRouter.get('/:id', pratosControllers.show)
pratosRouter.delete('/:id', pratosControllers.delete)
pratosRouter.get('/', pratosControllers.index)
pratosRouter.put('/:id', pratosControllers.update)
pratosRouter.patch("/avatar",ensureAuth,upload.single('avatar'), pratoImgController.update)


module.exports = pratosRouter