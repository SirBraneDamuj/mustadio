const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./resources/openapi.yaml');
const data = require('../data');
const items = require('../data/items');
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

router.get('/items', (req, res) => {
    const formatter = getFormatter(req.query);
    res.json({
        items: values(items.getItems()).map((item) => formatter.formatItemForApiResponse(item)),
    });
});

module.exports = router;