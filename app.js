const express = require('express');
const path = require('path');

const app = express();
//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Blog app sunucu ${port} portunda başlatıldı...`);
});