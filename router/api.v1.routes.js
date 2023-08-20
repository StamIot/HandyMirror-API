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

/**
 * =======================================================================
 * Documentation de Swagger
 * =======================================================================
 */

/**
 * @swagger
 * tags:
 *      name: default
 *      description: Je vous propose toutes les routes actuellement fonctionnel pour notre API
 */

/**
 * @swagger
 * /api/v1/handy-docs:
 *   get:
 *     summary: Renvoie la page d'accueil de la documentation de l'API faite avec Swagger
 *     responses:
 *       200:
 *         description: Page sur la documentation de l'API renvoyée avec succès!
 */
router.get('/handy-docs', BaseController.getHandyDocs);

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Cette route te permet de créer un nouvel utilisateur
 *     responses:
 *       400:
 *         description: Erreur de validation des champs.
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Tous les champs doivent être renseignés.
 *               MissingFirstName:
 *                 summary: Tu dois renseigner un prénom.
 *               MissingLastName:
 *                 summary: Tu dois renseigner un nom.
 *               MissingEmail:
 *                 summary: Tu dois renseigner un email.
 *               MissingPassword:
 *                 summary: Tu dois renseigner un mot de passe.
 *               MissingConfirmPassword:
 *                 summary: Tu dois renseigner une confirmation du mot de passe.
 *               PasswordMismatch:
 *                 summary: Les mots de passes ne correspondent pas.
 *       409:
 *         Désolé l'email existe déjà en base de donnée.
 *       201:
 *         description: Enregistrement effecturer avec succès.
 */
router.post('/signup', BaseController.postSignUp);

/**
 * @swagger
 * /api/v1/signin:
 *   post:
 *     summary: Connecte un utilisateur
 *     responses:
 *       400:
 *         description: Erreur de validation des champs.
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Vous devez saisir tous les champs.
 *               MissingEmail:
 *                 summary: Vous devez saisir un email.
 *               MissingPassword:
 *                 summary: Vous devez saisir un mot de passe.
 *       422:
 *         description: L'email n'existe pas en base de données ou le mot de passe est incorrect.
 *       200:
 *         description: Utilisateur connecté avec succès.
 */
router.post('/signin', BaseController.postSignIn);

/**
 * =======================================================================
 * ModuleController
 * =======================================================================
 */

/**
 * @swagger
 * /api/v1/modules:
 *   post:
 *     summary: Crée un nouveau module
 *     responses:
 *       400:
 *         description: Erreur de validation des champs.
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Tous les champs doivent être renseignés.
 *               MissingName:
 *                 summary: Tu dois renseigner un nom pour ce module.
 *               MissingDescription:
 *                 summary: Tu dois renseigner une description pour ce module.
 *       409:
 *         description: Désolé, le module existe déjà en base de données.
 *       201:
 *         description: Module enregistré avec succès.
 */
router.post('/modules', ModuleController.postModule);

/**
 * @swagger
 * /api/v1/modules:
 *   get:
 *     summary: Récupère tous les modules
 *     responses:
 *       200:
 *         description: Liste de modules récupérée avec succès.
 *       204:
 *         description: Aucun module enregistré.
 */
router.get('/modules', ModuleController.getAllModules);

/**
 * @swagger
 * /api/v1/modules/{id}:
 *   get:
 *     summary: Récupère un module par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du module à récupérer
 *     responses:
 *       200:
 *         description: Module récupéré avec succès.
 *       404:
 *         description: Module non valide ou introuvable.
 */
router.get('/modules/:id', ModuleController.getModuleByID);

/**
 * =======================================================================
 * UserController
 * =======================================================================
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste d'utilisateurs récupérée avec succès.
 *       204:
 *         description: Aucun utilisateur enregistré.
 */
router.get('/users', UserController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *       404:
 *         description: Utilisateur non valide ou introuvable.
 */
router.get('/users/:id', UserController.getUserByID);

/**
 * @swagger
 * /api/v1/users/{id}/photos:
 *   get:
 *     summary: Récupère un utilisateur par son ID et affiche toutes ses photos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *       404:
 *         description: Utilisateur non valide ou introuvable.
 */
router.get('/users/:id/photos', UserController.getUserPhotosByID);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Mise à jour complète d'un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour.
 *     requestBody:
 *       description: Données de mise à jour de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Prénom de l'utilisateur.
 *               lastname:
 *                 type: string
 *                 description: Nom de l'utilisateur.
 *               pseudo:
 *                 type: string
 *                 description: Pseudonyme de l'utilisateur.
 *               phone:
 *                 type: string
 *                 description: Numéro de téléphone de l'utilisateur.
 *               genre:
 *                 type: string
 *                 description: Genre de l'utilisateur (Homme/Femme).
 *               addressAtHome:
 *                 type: string
 *                 description: Adresse de l'utilisateur.
 *               city:
 *                 type: string
 *                 description: Ville de l'utilisateur.
 *               country:
 *                 type: string
 *                 description: Pays de l'utilisateur.
 *               children:
 *                 type: string
 *                 description: Indication si l'utilisateur a des enfants (Oui/Non).
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               pseudo: johndoe
 *               phone: 0769696969
 *               genre: Homme
 *               addressAtHome: 123 Main St
 *               city: MyCity
 *               country: MyCountry
 *               children: Oui
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Requête invalide (champs manquants, etc.).
 *       404:
 *         description: Utilisateur non valide ou introuvable pour la mise à jour.
 *       500:
 *         description: Erreur interne du serveur lors de la mise à jour.
 */
router.put('/users/:id', UserController.putUserByID);

/**
 * @swagger
 * /api/v1/users/{id}/photos:
 *   put:
 *     summary: Mise à jour complète d'un utilisateur par son ID pour ses photos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour.
 *     requestBody:
 *       description: Données de mise à jour de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photos.face:
 *                 type: string
 *                 description: Photo de face.
 *               photos.left:
 *                 type: string
 *                 description: Photo côté gauche.
 *               photos.right:
 *                 type: string
 *                 description: Photo côté droit.
 *             example:
 *               photos: {
 *                 face: "url",
 *                 left: "url",
 *                 right: "url",
 *               }
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Requête invalide (champs manquants, etc.).
 *       404:
 *         description: Utilisateur non valide ou introuvable pour la mise à jour.
 *       500:
 *         description: Erreur interne du serveur lors de la mise à jour.
 */
router.put('/users/:id/photos', UserController.putUserPhotoByID);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non valide ou introuvable pour la suppression.
 */
router.delete('/users/:id', UserController.deleteUserByID);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = router;
