/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
const router = require('express').Router();

/**
 * =======================================================================
 * Models
 * =======================================================================
 */
const BaseController = require('../API/controllers/Base.controller');
const ModuleController = require('../API/controllers/Module.controller');
const UserController = require('../API/controllers/User.controller');

/**
 * =======================================================================
 * BaseController
 * =======================================================================
 */
router.get('/', BaseController.getHome);
router.post('/signup', BaseController.postSignUp);
router.post('/signin', BaseController.postSignIn);

/**
 * =======================================================================
 * ModuleController
 * =======================================================================
 */
router.post('/modules', ModuleController.postModule);
router.get('/modules', ModuleController.getAllModules);
router.get('/modules/:id', ModuleController.getModuleByID);

/**
 * =======================================================================
 * UserController
 * =======================================================================
 */
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserByID);
router.delete('/users/:id', UserController.deleteUserByID);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
