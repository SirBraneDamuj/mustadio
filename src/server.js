const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('pug');
const data = require('./data');
const twitch = require('./twitch');
const app = express();

const port = process.env['PORT'];

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

app.post('/bet', (req, res) => {
    const team = req.body.data.team;
    const amount = req.body.data.amount;
    twitch.say(`!bet ${amount} ${team}`)
    res.json({ success: true });
});

app.post('/allin/:team', (req, res) => {
    const team = req.params['team'];
    twitch.say(`!allin ${team}`);
    res.json({ success: true });
});

module.exports = {
    start() {
        app.listen(port);
    }
}