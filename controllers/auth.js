require('dotenv').config()
const jwt = require('../middlewares/jwt')
/**
 * Database init
 */
const database = require('../middlewares/db')
const db = new database.db()
db.Init()

// SQL injection prevention
const pattern = /[-';()_]/g;

exports.loginPage = async (req, res, next) => {
    return res.render('auth/login.jade', { username: '#' })
}

exports.login = async (req, res, next) => {
    let { username, password } = req.body
    username = username.replace(pattern, '')
    password = password.replace(pattern, '')

    if (password.length < 8) {
        res.location('/auth/login')
        res.redirect('/auth/login')
    } else {
        db.verifyUser(username, password)
            .then((userToken) => {
                res.cookie('token', userToken, {
                    maxAge: parseInt(process.env.JWT_EXP) * 1000,
                    sameSite: 'strict'
                })
                res.location('/')
                res.redirect('/')
            })
            .catch((err) => {
                res.location('/auth/login')
                res.redirect('/auth/login')
            })
    }
}

exports.registerPage = async (req, res, next) => {
    return res.render('auth/register.jade', { username: '#' })
}

exports.register = async (req, res, next) => {
    let { username, password, rePassword } = req.body
    username = username.replace(pattern, '')
    password = password.replace(pattern, '')
    rePassword = rePassword.replace(pattern, '')

    if (password !== rePassword || password.length < 8) {
        res.location('/auth/register')
        res.redirect('/auth/register')
    } else {
        db.createUser(username, password)
            .then((userToken) => {
                res.cookie('token', userToken, {
                    maxAge: parseInt(process.env.JWT_EXP) * 1000,
                    sameSite: 'strict'
                })
                res.location('/')
                res.redirect('/')
            })
            .catch((err) => {
                res.location('/auth/register')
                res.redirect('/auth/register')
            })
    }
}

exports.isAuth = (req, res, next) => {
    const token = req.cookies.token || null
    if (token === null) {
        res.location('/auth/login')
        res.redirect('/auth/login')
    } else {
        try {
            jwt.verify(token)
            next()
        } catch (err) {
            res.location('/auth/login')
            res.redirect('/auth/login')
        }
    }
}