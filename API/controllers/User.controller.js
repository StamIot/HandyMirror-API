/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
const bcrypt = require('bcrypt');
const { isValidObjectId } = require('mongoose');

/**
 * =======================================================================
 * Models
 * =======================================================================
 */
const UserModel = require('../models/User.model');

/**
 * =======================================================================
 * Controllers
 * =======================================================================
 */
const getAllUsers = async (req, res) => {
    try {
        const counter = await UserModel.estimatedDocumentCount();

        if (counter === 0) {
            return res.status(204).json({
                error: 'Aucun utilisateur enregistré',
            });
        }

        // J'ai au moins un utilisateur enregistré
        const resultGetAllUsers = await UserModel.find();

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
            const getUserID = await UserModel.findOne({ _id: userID }).populate('modules');

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

const putUserByID = async (req, res) => {
    try {
        const { id: userID } = req.params;
        const checkValidUserID = isValidObjectId(userID);

        if (!checkValidUserID) {
            return res.status(400).json({ error: `l'ID : "${userID}" saisi n'existe pas en base de donnée` });
        } else {
            const { firstname, lastname, pseudo, phone, genre, addressAtHome, city, country, compagnionLife, children } = req.body;

            // Vérifiez que tous les champs requis sont renseignés
            if (!firstname && !lastname && !pseudo && !phone && !genre && !addressAtHome && !city && !country && !compagnionLife && !children) {
                return res.status(400).json({ error: 'Tous les champs doivent être renseignés.' });
            }

            // Vérification de l'existence de l'utilisateur
            const userExist = await UserModel.findById(userID);

            if (!userExist) {
                return res.status(404).json({ error: 'Utilisateur non trouvé.' });
            }

            // Mise à jour de l'utilisateur
            const updatedUser = await UserModel.findByIdAndUpdate(
                userID,
                {
                    firstname,
                    lastname,
                    pseudo,
                    phone,
                    genre,
                    addressAtHome,
                    city,
                    country,
                    compagnionLife,
                    children,
                },
                {
                    new: true,
                },
            );

            if (updatedUser) {
                return res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
            } else {
                return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur." });
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
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

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = {
    getAllUsers,
    getUserByID,
    putUserByID,
    deleteUserByID,
};
