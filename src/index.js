const express = require('express');
const jwt = require('jsonwebtoken');
const { auth } = require('./auth');

// Routers
const authRoute = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/auth', authRoute);

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.get('/client', auth, (req, res, next) => {
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
})

app.listen(3000, () => console.log("Servidor escutando na porta 3000..."));
