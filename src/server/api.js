const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./resources/openapi.yaml');
const data = require('../data');
const items = require('../data/items');
const abilities = require('../data/abilities');
const classes = require('../data/classes');
const { GENDERS } = require('../data/constants');
const values = require('lodash/values');
const ApiFormatter = require('./formatter');

const router = express.Router();
router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

const getFormatter = (query) => {
    const include = String(query.include);
    return new ApiFormatter(include.includes('info'), include.includes('stats'))
}

router.get('/tournaments/:tournamentId', async (req, res) => {
    const tournamentId = req.params.tournamentId === 'latest' ? await data.getLatestTournamentId() : req.params.tournamentId;
    const result = await data.getFullTournament(tournamentId);
    const formatter = getFormatter(req.query);

    const body = formatter.formatTournament(result);
    res.json(body);
});

router.get('/tournaments/:tournamentId/teams/:teamName', async (req, res) => {
    const tournamentId = req.params.tournamentId === 'latest' ? await data.getLatestTournamentId() : req.params.tournamentId;
    const result = await data.getTeamForTeamName(tournamentId, req.params.teamName);
    const formatter = getFormatter(req.query);

    const body = formatter.formatTeamForApiResponse(tournamentId, result);
    res.json(body);
});


router.get('/items', (req, res) => {
    const formatter = getFormatter(req.query);
    res.json({
        items: values(items.getItems()).map((item) => formatter.formatItemForApiResponse(item)),
    });
});

router.get('/abilities', (req, res) => {
    const formatter = getFormatter(req.query);
    res.json({
        abilities: values(abilities.getAbilities()).map((ability) => formatter.formatAbilityForApiResponse(ability)),
    });
});

router.get('/classes', (req, res) => {
    const formatter = getFormatter(req.query);
    res.json({
        classes: values(classes.getClasses()).flatMap((clazz) => {
            return GENDERS.reduce((genderClasses, gender) => {
                if (clazz[gender]) {
                    genderClasses.push(formatter.formatClassGenderForApiResponse(clazz[gender]));
                }
                return genderClasses;
            }, []);
        })
    });
});

module.exports = router;