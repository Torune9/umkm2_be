require('dotenv').config()

require('pg')

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router/router')

app.set('view engine','ejs')

app.use('/source',express.static('uploads'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : false
}))


app.use(router)

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use((req, res, next) => {
    res.status(404).render('notFound');
});



module.exports = app