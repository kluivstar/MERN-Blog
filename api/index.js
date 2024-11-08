//SERVER CODE

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
app.use(express.json())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(cookieParser())

// Make uploaded files accessible
app.use('/uploads', express.static(__dirname + '/uploads'));

// Hashing
const salt = bcrypt.genSaltSync(10);
const secret = 'gdf43drgredgwegw345werjktjwertkj';

// Connect Database
mongoose.connect('mongodb+srv://blog:nBw6xo4XmtRX8NRP@cluster0.wxx9pv4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

// RHF to defined user registration endpoint/route
app.post('/register', async(req, res) =>{
    const {username,password} = req.body;
    try{
    const userDoc = await User.create({username, password:bcrypt.hashSync(password,salt)})
    res.json(userDoc);
    } catch(err){
        res.status(400).json(err)
    }
});

// // RHF to defined user login endpoint/route
app.post('/login', async(req, res) => {
    const {username, password} = req.body
    const userDoc = await User.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk){
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) =>{
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username
            })
        })
    } else {
        res.status(400).json('wrong credentials.')
    }


})

// RHF for user profile endpoint/route
app.get('/profile', async(req,res) => {
    const {token} = req.cookies
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
});

// RHF for logout endpoint/route
app.post('/logout', (req, res) =>{
    res.cookie('token', '').json('Ok')
})


// RHF for creating a new post
app.post('/post', uploadMiddleware.single('file'), async(req, res) => {
    const {originalname,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)

    const {token} = req.cookies
    jwt.verify(token, secret, {}, async(err, info) => {
        if (err) throw err
        const {title,summary,content} = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id
        })
        res.json(postDoc)
    })
})

// RHF for update a post
app.put('/post', uploadMiddleware.single('file'), async(req, res) => {
    let newPath = null
    if(req.file) {
        const {originalname,path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
    
    }

    const {token} = req.cookies

    jwt.verify(token, secret, {}, async(err, info) => {
        if (err) throw err
        const {id,title,summary,content} = req.body
        const postDoc = await Post.findByIdAndUpdate(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
        if (!isAuthor){
            return res.status(400).json('You not the author')
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        })
        res.json(postDoc)
    })
})

// RHF for fetch blog posts
app.get('/post', async(req, res)=>{
    res.json(
        await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    )
})

// RHF to fetch single blog post
app.get('/post/:id', async(req, res) =>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

// Start Server
app.listen(4000, ()=>{
    console.log("Servers running....")
});