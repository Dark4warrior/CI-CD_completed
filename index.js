//Just a test for the pipeline
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Node.js basique !');
});

app.listen(PORT, () => {
    console.log(`API démarrée sur le port ${PORT}`);
});
