const express = require('express');
const { auth } = require('./controllers/auth');

// Routers
const authRoute = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/auth', authRoute);

app.get('/', (req, res, next) => {
    res.json({ message: "OK" });
})

app.listen(3000, () => console.log("Servidor escutando na porta 3000..."));
