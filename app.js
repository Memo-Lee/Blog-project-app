const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// TEMPLATES
app.set('view engine','ejs');
//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('/addpost', (req, res) => {
    res.render('add_post')
});
app.get('/post', (req, res) => {
    res.render('post')
});

const port = 3000;
app.listen(port, () => {
    console.log(`Blog app sunucu ${port} portunda başlatıldı...`);
});