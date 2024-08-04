require('dotenv').config()
import pg from 'pg'

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router/router')


const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err.stack))

app.set('view engine','ejs')

app.use('/source',express.static('uploads'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : false
}))

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use(router)

app.use((req, res, next) => {
    res.status(404).render('notFound');
});


module.exports = app