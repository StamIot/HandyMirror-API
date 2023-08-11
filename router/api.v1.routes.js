const router = require('express').Router();
const ApiController = require('../controllers/Api.controller');

router.get('/', ApiController.getHome);
router.post('/signup', ApiController.postSignup);

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    res.json({
        body: {
            email,
            password,
        },
    });
});

module.exports = router;
