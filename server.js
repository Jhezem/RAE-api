const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const RAE = require('./index');

app.get('/', (req, res) => {
    res.send('Bienvenido a word api');
});

app.get('/existe/:word', async (req, res) => {
    const {word} = req.params;
    res.json({'existe': await RAE.doesExist(word)});
});

app.get('/significado/:word', async (req, res) => {
    const {word} = req.params;
    res.json({"significados": await RAE.getMeaning(word)})
});

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});