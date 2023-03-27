require('dotenv').config()
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

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

    }
    verifyUser(username, password) {

    }
    Close() {
        this.#Conn.end()
    }
}

module.exports = {
    db: MySQLDB
}