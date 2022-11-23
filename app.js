const express = require('express');
const mongosee = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const Post = require('./models/Post');
const Project = require('./models/Project');

const app = express();

// connect DB
mongosee.connect('mongodb://localhost/blog-test-db');

// TEMPLATES
app.set('view engine','ejs');
//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get('/', async (req, res) => {
    const posts = await Post.find({}); 
    const projects = await Project.find({});
    res.render('index',{
        posts,
        projects
    });
});

// BLOG POSTS
app.get('/postspage', async (req, res) => {
    const posts = await Post.find({});
    res.render('posts',{
        posts
    });
}); // okey

app.post('/posts', async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Post.create({
            ...req.body,
            image: '/uploads' + uploadImage.name,
        })
    });
    res.redirect('/');
}); // okey

app.get('/posts/:id', async (req,res)=>{
    const post = await Post.findById(req.params.id);
    res.render('postdetails',{
        post
    });
}); // okey



// PROJECT 
app.get('/projectspage', async (req, res) => {
    const projects = await Project.find({});
    res.render('projects',{
        projects
    });
});

app.post('/projects', async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Project.create({
            ...req.body,
            image: '/uploads' + uploadImage.name,
        })
    });
    res.redirect('/');
});

app.get('/projects/:id', async (req,res)=>{
    const project = await Project.findById(req.params.id);
    res.render('projectdetails',{
        project
    });
});


app.get('/about', (req, res) => {
    res.render('about')
});
app.get('/addpost', (req, res) => {
    res.render('addpost')
});
app.get('/addproject', (req, res) => {
    res.render('addproject')
});

const port = 3000;
app.listen(port, () => {
    console.log(`Blog app sunucu ${port} portunda başlatıldı...`);
});