const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')

router.get('/register',authControllers.showRegister)
router.post('/register',authControllers.Register)
router.get('/login',authControllers.showLogin)
router.post('/login',authControllers.Login);

module.exports = router