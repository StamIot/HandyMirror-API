const router = require('express').Router();
const ApiController = require('../controllers/Api.controller');

router.get('/', ApiController.getHome);
router.get('/users', ApiController.getAllUsers);

router.post('/signup', ApiController.postSignUp);
router.post('/signin', ApiController.postSignIn);

module.exports = router;
