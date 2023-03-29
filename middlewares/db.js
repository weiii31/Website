require('dotenv').config()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const jwt = require('./jwt')

class MySQLDB {
    #DBHost
    #DBPort
    #DBUser
    #DBPass
    #Database
    #Conn
    constructor() {
        this.#DBHost = process.env.DBHost
        this.#DBPort = process.env.DBPort
        this.#DBUser = process.env.DBUser
        this.#DBPass = process.env.DBPass
        this.#Database = process.env.Database
    }
    Init() {
        this.#Conn = mysql.createConnection({
            host: this.#DBHost,
            port: this.#DBPort,
            user: this.#DBUser,
            password: this.#DBPass,
            database: this.#Database
        })
        this.#Conn.connect()
    }
    createUser(username, password) {
        return new Promise((resolve, reject) => {
            const uExistQueryCmd =
                `SELECT COUNT(*) AS count FROM ${process.env.DBAuthTable} WHERE username = '${username}'`
            this.#Conn.query(uExistQueryCmd, (err, result) => {
                if (err) reject(err)
                else if (result[0].count > 0) {
                    reject(
                        new Error(`User ${username} already exists ... `)
                    )
                }
                else {
                    // Create user
                    const hashedPass = bcrypt.hashSync(password, 10)

                    // Insert user
                    const createUserQueryCmd =
                        `INSERT INTO ${process.env.DBAuthTable} (username, password) VALUES ('${username}', '${hashedPass}')`

                    this.#Conn.query(createUserQueryCmd, (err, result) => {
                        if (err) reject(err)
                        else resolve(jwt.gentoken(username))
                    })
                }
            })
        })
    }
    verifyUser(username, password) {
        return new Promise((resolve, reject) => {
            const getHashedPassQueryCmd = 
                `SELECT password FROM ${process.env.DBAuthTable} WHERE username='${username}'`
            this.#Conn.query(getHashedPassQueryCmd, (err, result)=>{
                if(err) reject(
                    new Error(`User ${username} not exists ... `)
                )
                if(bcrypt.compareSync(password, result[0]['password'])){
                    resolve(jwt.gentoken(username))
                }else{
                    reject(
                        new Error('Password incorrect ... ')
                    )
                }
            })
        })
    }
    Close() {
        this.#Conn.end()
    }
}

module.exports = {
    db: MySQLDB
}