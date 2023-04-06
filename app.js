/**
 * =======================================================================
 * Dépendances (modules)
 * =======================================================================
 */
require('dotenv').config()
require('./config/database/db')
const express = require('express')

/**
 * =======================================================================
 * Import du routing
 * =======================================================================
 */

/**
 * =======================================================================
 * Configuration de l'application
 * =======================================================================
 */
const app = express()
const HOSTNAME = process.env.HOSTNAME || 'localhost'
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('coucou')
})

/**
 * =======================================================================
 * Démarage de l'application selon un certain PORT.
 * =======================================================================
 */
app.listen(PORT, () => {
    console.log(`API démarré à cette adresse : http://${HOSTNAME}:${PORT}`)
})
