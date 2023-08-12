const UserModel = require('../models/User.model');

const getHome = (_, res) => {
    res.status(200).json({
        salutation: 'Hello world',
    });
};

const postSignup = async (req, res) => {
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
        });

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

module.exports = {
    getHome,
    postSignup,
};
