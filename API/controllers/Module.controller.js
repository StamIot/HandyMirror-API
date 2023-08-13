/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
const { isValidObjectId } = require('mongoose');

/**
 * =======================================================================
 * Models
 * =======================================================================
 */
const ModuleModel = require('../models/Module.model');

/**
 * =======================================================================
 * Controllers
 * =======================================================================
 */
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
const getAllModules = async (_, res) => {
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

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = {
    postModule,
    getAllModules,
    getModuleByID,
};
