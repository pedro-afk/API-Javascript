const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');

const app = express();

//mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27017/apimongo', {
    useUnifiedTopology: true, 
    useNewUrlParser: true
}).then(() => {
    console.log('Conectado ao banco de dados...');
}).catch((error) => {
    console.log(`Erro de conexão ${error}`);
});

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando...');
});

//myapi222 == secret