const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const bodyParser = require('body-parser');
const data = require('../data');
const app = express();

const port = process.env['PORT'];

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (_, res) => {
    await data.ready();
    res.redirect('/red/blue');
});

app.get('/new', async (_, res) => {
    await data.reinitialize();
    res.redirect('/red/blue');
});

app.get('/:team1/:team2', async (req, res) => {
    await data.ready();
    const context = {
        state: 'match',
        team1: {
            name: req.params['team1'],
            units: data.unitsForTeam(req.params['team1']),
        },
        team2: {
            name: req.params['team2'],
            units: data.unitsForTeam(req.params['team2']),
        },
    };
    res.render('match', context);
});

module.exports = {
    start() {
        app.listen(port);
    }
}