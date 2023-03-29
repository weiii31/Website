const router = require('express').Router()
const { login, loginPage, registerPage, register } = require('../controllers/auth')

router.route('/login')
    .get(loginPage)
    .post(login)

router.route('/register')
    .get(registerPage)
    .post(register)

module.exports= router