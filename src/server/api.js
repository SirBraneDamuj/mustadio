const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./resources/openapi.yaml');
const data = require('../data');
const ApiFormatter = require('./formatter');

const router = express.Router();
router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));


router.get('/tournaments/:tournamentId', async (req, res) => {
    const tournamentId = req.params.tournamentId === 'latest' ? await data.getLatestTournamentId() : req.params.tournamentId;
    const include = [].concat(req.query.include);
    const result = await data.getFullTournament(tournamentId);
    const formatter = new ApiFormatter(include.includes('info'), include.includes('stats'))

    body = formatter.formatTournament(result);
    console.log(include);
    res.json(body);
});

module.exports = router;