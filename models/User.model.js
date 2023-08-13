/**
 * #### Mongoose
 * @version 7.4.2
 * @see https://www.npmjs.com/package/mongoose
 */
const mongoose = require('mongoose');
/**
 * #### Bcrypt
 * @version 5.1.0
 * @see https://www.npmjs.com/package/bcrypt
 */
const bcrypt = require('bcrypt');

/**
 * _COLLECTION_NAME fait référence à MONGODB_COLLECTION_NAME issu du fichier .env_
 */
const COLLECTION_USERS = process.env.MONGODB_COLLECTION_USERS;

/**
 * _Définition du schéma pour un utilisateur_
 */
const UserSchema = mongoose.Schema(
    {
        firstname: {
            type: mongoose.Schema.Types.String,
            required: true,
            trim: true,
        },
        lastname: {
            type: mongoose.Schema.Types.String,
            required: true,
            uppercase: true,
            trim: true,
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
            trim: true,
        },
        modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'modules' }],
    },
    {
        timestamps: true,
    },
);

/**
 * Middleware .pre qui permet de controller le password et de l'encrypter
 */
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Middleware pre-save pour ajouter des modules par défaut
UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const defaultModuleIds = [
                '64d8df7226bb4f951331e3f2', // Clock
                '64d8e2c75a4e966a9c7782bd', // MMM-MedicationReminder
                '64d8e2ca5a4e966a9c7782c0', // MMM-OpenmapWeather
                '64d8e2cc5a4e966a9c7782c3', // MMM-tda
            ];
            this.modules.push(...defaultModuleIds);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model(COLLECTION_USERS, UserSchema);
