const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const bodyParser = require('body-parser');
const data = require('../data');
const items = require('../data/items')
const config = require('../config');
const app = express();

const port = config.PORT || 3000;

app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.get('/', async (_, res) => {
    const tournamentId = await data.getLatestTournamentId();
    res.redirect(`/${tournamentId}/red/blue`);
});

app.get('/:tournamentId/:team1/:team2', async (req, res) => {
    const { tournamentId, team1, team2 } = req.params;
    if (req.params.tournamentId === 'latest') {
        const realTournamentId = await data.getLatestTournamentId();
        res.redirect(`/${realTournamentId}/${team1}/${team2}`);
    } else {
        const [team1Record, team2Record] = await data.getTeamsForTournament(tournamentId, team1, team2);
        const context = {
            team1: team1Record,
            team2: team2Record,
            tournamentId,
            items: await items.getItems(),
        };
        res.render('match', context);
    }
});

module.exports = {
    start() {
        app.listen(port);
    }
}