require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.gentoken = (username) => {
    return jwt.sign({
        username: username
    }, process.env.JWT_KEY, {
        expiresIn: parseInt(process.env.JWT_EXP) * 1000
    })
}

exports.verify = (token)=>{
    return jwt.verify(token, process.env.JWT_KEY)
}

exports.decode = (token) =>{
    let decoded = null
    try{
        decoded = jwt.verify(token, process.env.JWT_KEY)
    }catch(err){
        throw err
    }
    return decoded
}