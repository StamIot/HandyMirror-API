/**
 * =======================================================================
 * Dépendances ou module
 * =======================================================================
 */
const mongoose = require('mongoose');

/**
 * =======================================================================
 * Configuration des variables d'environnement
 * =======================================================================
 */
const USERNAME = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const CLIENT = process.env.MONGODB_CLIENT_NAME;
const DATABASE = process.env.MONGODB_DATABASE_NAME;

/**
 * =======================================================================
 * Masquer les warning pour des futures version
 * =======================================================================
 */
// mongoose.set('strictQuery', true); (Inutile v7 de mongoose)

/**
 * =======================================================================
 * Connexion selon l'URI récupérer sur MongoDB pour VsCode
 * =======================================================================
 */
mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${CLIENT}/${DATABASE}`)
    .then(() => console.log(`connecté à la bdd de mongoDB sous le pseudo ${USERNAME}`))
    .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
    });
