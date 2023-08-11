/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
require('dotenv').config();
require('./config/database/db');
const express = require('express');
const morgan = require('morgan');

/**
 * =======================================================================
 * Import du routing
 * =======================================================================
 */
const routerApiV1 = require('./router/api.v1.routes');

/**
 * =======================================================================
 * Configuration de l'application
 * =======================================================================
 */
const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

/**
 * =======================================================================
 * Mise en places des Middlewares
 * =======================================================================
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

/**
 * =======================================================================
 * Utilisation du routing selon une certaine route.
 * "/api" => Api
 * =======================================================================
 */
app.use('/api/v1', routerApiV1);
/**
 * =======================================================================
 * Redirection vers la route /api/v1
 * =======================================================================
 */
app.get(['/', '/api'], (_, res) => {
    res.redirect('/api/v1');
});

/**
 * =======================================================================
 * Démarage de l'application selon un certain PORT.
 * =======================================================================
 */
app.listen(PORT, () => {
    console.log(`API démarré à cette adresse : http://${HOST}:${PORT}`);
});
