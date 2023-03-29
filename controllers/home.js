require('dotenv').config()
const jwt = require('../middlewares/jwt')

exports.index = (req, res, next) => {
    const token = req.cookies.token || null
    res.render('index', { username: jwt.decode(token)['username'] });
}