const express = require('express')
const path = require('path')
const Blog = require('./model/Blog')

const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')
const mongoose = require('mongoose')
const cookieParse = require('cookie-parser')
const { CheckForAuthenticationCookie } = require('./middlewares/authentication')
const { log } = require('console')



const app = express()
const PORT = 400

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
mongoose.connect('mongodb://127.0.0.1:27017/techies').then((e) => console.log('MongoDB is Connected'))

app.use(express.urlencoded({extended : false}))
app.use(cookieParse())
app.use(express.static(path.resolve('./public')))
app.use(CheckForAuthenticationCookie('token'))
app.get("/", async(req,res) =>{
    const allBlog = await Blog.find({})
    res.render("home",{
        user : req.user,
        blogs : allBlog
    })
})



app.use('/user',userRoutes);
app.use('/blog',blogRoutes);

app.listen(PORT,()=>console.log(`Server running at PORT: ${PORT}`))