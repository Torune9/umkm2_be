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

app.use((req, res, next) => {
    res.status(404).render('notFound');
});

app.listen(port,()=>{
    console.log('server runnning at port 3000');
    
})

module.exports = app