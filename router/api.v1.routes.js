const router = require('express').Router();
const ApiController = require('../controllers/Api.controller');

router.get('/', ApiController.getHome);

// Users
router.get('/users', ApiController.getAllUsers);
router.get('/users/:id', ApiController.getUserByID);
router.delete('/users/:id', ApiController.deleteUserByID);

// Modules
router.post('/modules', ApiController.postModule);
router.get('/modules', ApiController.getAllModules);
router.get('/modules/:id', ApiController.getModuleByID);

// SignUp & SignIn
router.post('/signup', ApiController.postSignUp);
router.post('/signin', ApiController.postSignIn);

module.exports = router;
