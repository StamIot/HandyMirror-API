/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
require('dotenv').config();
require('./config/database/db');
const express = require('express');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

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
 * Configuration de Swagger
 * =======================================================================
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        explorer: true,
        info: {
            title: 'HandyMirror API',
            version: '1.0.0',
            description: `Découvrez une API concocter à la main pour permettre d'être utiliser avec notre application mobile et surtout notre miroir connecté. (Magic Mirror ²)`,
        },
        servers: [
            {
                url: `http://${HOST}:${PORT}`,
            },
        ],
    },
    apis: ['./router/*.js', './API/controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api/v1/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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
 * Redirection vers la documentation de l'API avec Swagger
 * =======================================================================
 */
app.get(['/', '/api'], (_, res) => {
    res.redirect('/api/v1/');
});

/**
 * =======================================================================
 * Démarage de l'application selon un certain PORT.
 * =======================================================================
 */
app.listen(PORT, () => {
    console.log(`API démarré à cette adresse : http://${HOST}:${PORT}`);
});
