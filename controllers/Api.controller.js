const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const ModuleModel = require('../models/Module.model');

const getHome = (_, res) => {
    res.status(200).json({
        salutation: 'Hello world',
    });
};

const getAllUsers = async (req, res) => {
    try {
        const counter = await UserModel.estimatedDocumentCount();

        if (counter === 0) {
            return res.status(200).json({
                error: 'Aucun utilisateur enregistré',
            });
        }

        // J'ai au moins un utilisateur enregistré
        const resultGetAllUsers = await UserModel.find().populate('modules');

        if (resultGetAllUsers) {
            res.status(200).json(resultGetAllUsers);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const getUserByID = async (req, res) => {
    try {
        // Décomposition: alias
        const { id: userID } = req.params;

        // Check si UserID est valide
        const checkValidUserID = isValidObjectId(userID);

        if (!checkValidUserID) {
            return res.status(404).json({ error: "Désolé cet identifiant n'est pas valide" });
        } else {
            const getUserID = await UserModel.findOne({ _id: userID });

            if (!getUserID) {
                return res.status(404).json({ error: "Désolé, il n'existe aucun utilisateur avec cet identifiant" });
            } else {
                return res.status(200).json({
                    message: 'Récupération réussi avec succès',
                    users: getUserID,
                });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const deleteUserByID = async (req, res) => {
    try {
        // Décomposition: alias
        const { id: userID } = req.params;

        // Check si UserID est valide
        const checkValidUserID = isValidObjectId(userID);

        if (!checkValidUserID) {
            return res.status(404).json({ error: "Désolé cet identifiant n'est pas valide" });
        } else {
            const checkUserExist = await UserModel.findOne({ _id: userID });

            if (!checkUserExist) {
                return res.status(404).json({ error: "Suppression impossible, il n'existe aucun utilisateur avec cet identifiant" });
            } else {
                const deleteUserID = await UserModel.deleteOne({ _id: userID });
                if (deleteUserID) {
                    return res.status(200).json({
                        message: 'Supression réussi avec succès',
                        user: checkUserExist,
                    });
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const postModule = async (req, res) => {
    try {
        // Décomposition
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({ error: 'Tous les champs doivent être renseignés.' });
        }
        if (!name) {
            return res.status(400).json({ error: 'Tu dois renseigner un nom pour ce module.' });
        }
        if (!description) {
            return res.status(400).json({ error: 'Tu dois renseigner une description pour ce module.' });
        }

        // Vérrification de l'existance d'un module
        const checkModuleExist = await UserModel.findOne({ name: name });

        if (checkModuleExist) {
            res.status(409).json({
                error: `Désolé le module"${name}" existe déjà en base de donnée`,
            });
        } else {
            const newModule = await new ModuleModel({
                name: name,
                description: description,
                activated: false,
            });

            // Enregistrement d'un nouveau module
            const resultSavedNewModule = await newModule.save();

            if (resultSavedNewModule) {
                res.status(201).json({
                    message: 'Enregistrement effecturer avec succès',
                    module: resultSavedNewModule,
                });
            } else {
                console.log('error');
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const getAllModules = async (req, res) => {
    try {
        const counter = await ModuleModel.estimatedDocumentCount();

        if (counter === 0) {
            return res.status(200).json({
                error: 'Aucun Module enregistré',
            });
        }

        // J'ai au moins un module enregistré
        const resultGetAllModules = await ModuleModel.find();

        if (resultGetAllModules) {
            res.status(200).json(resultGetAllModules);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const getModuleByID = async (req, res) => {
    try {
        // Décomposition: alias
        const { id: moduleID } = req.params;

        // Check si moduleID est valide
        const checkValidModuleID = isValidObjectId(moduleID);

        if (!checkValidModuleID) {
            return res.status(404).json({ error: "Désolé ce module n'est pas valide" });
        } else {
            const getModuleID = await ModuleModel.findOne({ _id: moduleID });

            if (!getModuleID) {
                return res.status(404).json({ error: "Désolé, il n'existe aucun module avec cet identifiant" });
            } else {
                return res.status(200).json({
                    message: 'Récupération réussi avec succès',
                    modules: getModuleID,
                });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const postSignUp = async (req, res) => {
    try {
        // Décomposition
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        // Contrôle des erreurs probable
        if (!firstname && !lastname && !email && !password && !confirmPassword.trim()) {
            return res.status(400).json({ error: 'Tous les champs doivent être renseignés.' });
        }
        if (!firstname) {
            return res.status(400).json({ error: 'Tu dois renseigner un prénom.' });
        }
        if (!lastname) {
            return res.status(400).json({ error: 'Tu dois renseigner un nom.' });
        }
        if (!email) {
            return res.status(400).json({ error: 'Tu dois renseigner un email.' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Tu dois renseigner un mot de passe.' });
        }
        if (!confirmPassword.trim()) {
            return res.status(400).json({ error: 'Tu dois renseigner une confirmation du mot de passe.' });
        }
        if (password !== confirmPassword.trim()) {
            return res.status(400).json({ error: 'Les mots de passes ne correspondent pas' });
        }

        // Tout est OK création du nouveau User
        const newUser = await new UserModel({
            firstname,
            lastname,
            email,
            password,
        }).populate('modules');

        // Vérification de l'existance d'un utilisateur
        const checkUserFind = await UserModel.findOne({ email: email });

        if (checkUserFind) {
            res.status(409).json({
                error: `Désolé l'email "${email}" existe déjà en base de donnée`,
            });
        } else {
            // Enregistrement d'un nouvel utilisateur
            const resultSavedNewUser = await newUser.save();

            if (resultSavedNewUser) {
                res.status(201).json({
                    message: 'Enregistrement effecturer avec succès',
                    user: resultSavedNewUser,
                });
            } else {
                console.log('error');
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

const postSignIn = async (req, res) => {
    try {
        // décomposition
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({
                error: `Désolé vous devez saisir tous les champs.`,
            });
        }
        if (!email) {
            return res.status(400).json({
                error: `Désolé vous devez saisir email`,
            });
        }
        if (!password) {
            return res.status(400).json({
                error: `Désolé vous devez saisir un mot de passe`,
            });
        }

        const checkUserExist = await UserModel.findOne({ email: email });

        if (!checkUserExist) {
            res.status(422).json({
                error: `Désolé l'email "${email}" n'existe pas en base de donnée`,
            });
        } else {
            // Contrôle du mot de passe hashé en base de donnée
            const checkValidPassword = await bcrypt.compare(password, checkUserExist.password);

            if (!checkValidPassword) {
                res.status(422).json({
                    error: `Le mot de passe est incorrect.
                    `,
                });
            } else {
                // Utilisateur connecté avec succès
                res.status(200).json({
                    message: 'Connexion effectué avec succès',
                    user: checkUserExist,
                });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`\nError: ${error.message}\n\nStack: ${error.stack}\n\n`);
            res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        }
    }
};

module.exports = {
    getHome,
    getAllUsers,
    getUserByID,
    deleteUserByID,
    postModule,
    getAllModules,
    getModuleByID,
    postSignUp,
    postSignIn,
};
