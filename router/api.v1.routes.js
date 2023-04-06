const router = require('express').Router()
const ApiController = require('../controllers/Api.controller')

router.get('/', ApiController.getHome)

module.exports = router
