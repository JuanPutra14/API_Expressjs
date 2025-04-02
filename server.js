const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const thirdRoutes = require('./routes/thirdRoutes')
app.set('view engine','ejs')
app.use(bodyparser.json())
app.use(express.urlencoded({extended : true}))
app.use(session({
    secret:'secretkey',
    resave : false,
    saveUninitialized:true
}))

app.use('/',authRoutes)
app.use('/admin',adminRoutes)
app.use('/user',userRoutes)
app.use('/third',thirdRoutes)

const port = 3000
app.listen(port, ()=>{
    console.log(`SERVER RUNNING ON PORT ${port} `)
})