const express = require('express');
require('express-async-errors');
const favicon = require('serve-favicon')
const path = require('path');
const bodyParser = require('body-parser');
const data = require('../data');
const items = require('../data/items');
const abilities = require('../data/abilities');
const classes = require('../data/classes');
const statuses = require('../data/statuses');
const stats = require('../data/stats');
const zodiacs = require('../data/zodiacs');
const notables = require('../data/notables');
const { MATCHUPS, matchNumberForMatchup } = require('../data/constants');
const monsterSkills = require('../data/monster-skills');
const config = require('../config');
const apiRouter = require('./api');
const app = express();

const port = config.PORT || 3000;

app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use('/api/', apiRouter);

app.get('/', async (_, res) => {
    const tournamentId = await data.getLatestTournamentId();
    const [team1, team2] = (await data.getLatestMatchForTournamentId(tournamentId)) || ['red', 'blue'];
    res.redirect(`/${tournamentId}/${team1}/${team2}`);
});

app.get('/:tournamentId', async (req, res) => {
    const { tournamentId } = req.params;
    const [team1, team2] = await data.getLatestMatchForTournamentId(tournamentId);
    res.redirect(`/${tournamentId}/${team1}/${team2}`);
});

app.get('/:tournamentId/latest', async (req, res) => {
    const { tournamentId } = req.params;
    const [team1, team2] = await data.getLatestMatchForTournamentId(tournamentId);
    if (team1 === 'champion' && team2 === 'champion') {
        res.redirect(`/`);
    } else {
        res.redirect(`/${tournamentId}/${team1}/${team2}`);
    }
})

app.get('/:tournamentId/:team1/:team2', async (req, res) => {
    const { tournamentId, team1, team2 } = req.params;
    console.log(team1);
    console.log(team2);
    if (req.params.tournamentId === 'latest') {
        const realTournamentId = await data.getLatestTournamentId();
        res.redirect(`/${realTournamentId}/${team1}/${team2}`);
    } else {
        const maps = await data.getMapsForTournament(tournamentId);
        const [team1Record, team2Record] = await data.getTeamsForTournament(tournamentId, team1, team2);
        const context = {
            team1: team1Record,
            team2: team2Record,
            tournamentId,
            matchNumber: matchNumberForMatchup(team1, team2),
            matchups: MATCHUPS,
            maps,
            items: items.getItems(),
            abilities: abilities.getAbilities(),
            actives: abilities.activeAbilities,
            classes: classes.getClasses(),
            statuses: statuses.getStatuses(),
            monsterSkills,
            stats,
            zodiacs,
            notables,
        };
        res.render('match', context);
    }
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