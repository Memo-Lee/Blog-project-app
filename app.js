const express = require('express');
const mongosee = require('mongoose');
const ejs = require('ejs');
const path = require('path');
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

// ROUTES
app.get('/', async (req, res) => {
    const posts = await Post.find({}); 
    const projects = await Project.find({});
    res.render('index',{
        posts,
        projects
    });
});
app.post('/posts', async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
});
app.get('/post', (req,res)=>{
    res.render('post');
});
app.post('/projects', async (req, res) => {
    await Project.create(req.body);
    res.redirect('/');
});
app.get('/project', (req, res) => {
    res.render('project');
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