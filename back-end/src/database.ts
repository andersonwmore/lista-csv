var mysql = require('mysql')
import { config } from './config'

var con = mysql.createConnection({
    host: config.API_HOST,
    user: config.API_USER,
    password: config.API_PASSWORD,
    port: config.API_PORT,
    database: config.API_DATABASE
})

con.connect(function(err:string){
    if (err) throw err
    console.log("connect liso")
})	

module.exports = con