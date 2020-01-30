const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');
const twitch = require('./twitch');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const currentMatch = data.currentMatch();
    const currentState = data.currentState();
    if (currentState === 'match') {
        const context = {
            team1: {
                name: currentMatch[0],
                units: data.unitsForTeam(currentMatch[0]),
            },
            team2: {
                name: currentMatch[1],
                units: data.unitsForTeam(currentMatch[1]),
            },
        };
        res.render('match', context);
    } else if (currentState === 'betting') {
        res.send('coming soon');
    }
});

app.get('/:team1/:team2', (req, res) => {
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