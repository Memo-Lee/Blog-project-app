const express = require('express');
const mongosee = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/blogControllers');
const projectController = require('./controllers/projectControllers');
const pageController = require('./controllers/pageControllers');

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
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

// ROUTES
app.get('/', postController.getAllPosts,projectController.getAllProjects);

// BLOG POSTS
app.get('/postspage', pageController.getPostPage); // okey

app.get('/posts/:id', postController.getPost); // okey

app.post('/posts', postController.createPost); // okey

app.put('/posts/:id', postController.updatePost);

app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getPostEditPage);

// PROJECT 
app.get('/projectspage', pageController.getProjectPage);

app.get('/projects/:id', projectController.getProject);

app.post('/projects', projectController.createProject);

app.put('/projects/:id', projectController.updateProject);

app.delete('/projects/:id', projectController.deleteProject);

app.get('/projects/edit/:id', pageController.getProjectEditPage);


app.get('/about', pageController.getAboutPage);

app.get('/addpost', pageController.getPostAddPage);

app.get('/addproject', pageController.getProjectAddPage);

const port = 3000;
app.listen(port, () => {
    console.log(`Blog app sunucu ${port} portunda başlatıldı...`);
});