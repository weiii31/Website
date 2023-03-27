const router = require('express').Router()
const db_ = require('../middlewares/db')
const db = new db_.db()

router.route('/login')
    .get((req, res) => {
        res.render('auth/login', { username: '#' })
    })
    .post((req, res) => {
        const uname = req.body.username
        const upass = req.body.password

    })

router.route('/register')
    .get((req, res) => {
        res.render('auth/register', {username: '#'})
    })
    .post((req, res) => {

    })

module.exports = router