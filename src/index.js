const express = require('express');
const cors = require('cors');
const loggerHttp = require('pino-http');
const logger = require('./logging');
const { PORT } = require('./settings');

// Routers
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerHttp({ logger: logger }));

app.use('/auth', authRoute);
app.use('/posts', postsRoute);

app.get('/', (_, res) => {
    logger.info('Ping');
    res.json({ message: "OK" });
})

app.listen(3000, () => logger.info(`Servidor escutando na porta ${PORT}...`));
