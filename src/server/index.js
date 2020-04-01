const express = require('express');
require('express-async-errors');
const path = require('path');
const bodyParser = require('body-parser');
const items = require('../data/items');
const abilities = require('../data/abilities');
const classes = require('../data/classes');
const statuses = require('../data/statuses');
const zodiacs = require('../data/zodiacs');
const monsterSkills = require('../data/monster-skills');
const config = require('../config');
const apiRouter = require('./api');
const app = express();

const port = config.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', apiRouter);

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

app.use((_, res) => {
    res.status(404);
});

module.exports = {
    async start() {
        await Promise.all([items, abilities, statuses, classes, monsterSkills, zodiacs].map((it) => it.reload()));
        app.listen(port);
    }
}