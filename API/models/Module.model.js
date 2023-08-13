/**
 * #### Mongoose
 * @version 7.4.2
 * @see https://www.npmjs.com/package/mongoose
 */
const mongoose = require('mongoose');

/**
 * _COLLECTION_NAME fait référence à MONGODB_COLLECTION_MODULE issu du fichier .env_
 */
const COLLECTION_MODULES = process.env.MONGODB_COLLECTION_MODULES;

/**
 * _Définition du schéma pour un module
 */
const ModuleSchema = mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            trim: true,
            required: true,
        },
        description: {
            type: mongoose.Schema.Types.String,
            trim: true,
            required: true,
        },
        activated: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

/**
 * =======================================================================
 * Exports
 * =======================================================================
 */
module.exports = mongoose.model(COLLECTION_MODULES, ModuleSchema);
