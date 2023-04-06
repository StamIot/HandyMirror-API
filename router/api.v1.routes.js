const router = require('express').Router()
const bcrypt = require('bcrypt')
const ApiController = require('../controllers/Api.controller')

router.get('/', ApiController.getHome)

router.post('/signup', (req, res) => {
    const firstname = req.body.firstname
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if (firstname.length === 0) {
        res.json({
            error: 'Tu dois renseigner un caractère',
        })
    }

    if (confirmPassword === password) {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        res.status(200).json({
            body: {
                firstname,
                email,
                password: hashedPassword,
            },
        })
    } else {
        res.json({
            error: 'Ton mot de passe est différent',
        })
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    res.json({
        body: {
            email,
            password,
        },
    })
})

module.exports = router
