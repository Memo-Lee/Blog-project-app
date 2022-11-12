const express = require('express');
const path = require('path');

const app = express();

// MIDDLEWARES
app.use(express.static('public'));

app.get('/',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'temp/index.html'));
});

const port = 5001;
app.listen(port,() =>{
    console.log(`Blog app sunucu ${port} portunda başlatıldı...`);
});