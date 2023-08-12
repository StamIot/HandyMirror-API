/**
 * #### Mongoose
 * @version 7.0.3
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
const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;

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

module.exports = mongoose.model(COLLECTION_NAME, UserSchema);
