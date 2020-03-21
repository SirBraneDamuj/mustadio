const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./resources/openapi.yaml');
const data = require('../data');
const items = require('../data/items');
const abilities = require('../data/abilities');
const classes = require('../data/classes');
const statuses = require('../data/statuses');
const stats = require('../data/stats');
const monsterSkills = require('../data/monster-skills');
const { matchNumberForMatchup, GENDERS } = require('../data/constants');
const values = require('lodash/values');
const ApiFormatter = require('./formatter');

const toPairs = require('lodash/toPairs');

const router = express.Router();
router.use(cors());
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

router.get('/data', (_, res) => {
  const formatter = new ApiFormatter(true, true);
  res.json({
    items: Object.fromEntries(toPairs(items.getItems()).map(([itemName, item]) => {
      return [
        itemName,
        formatter.formatItemForApiResponse(item),
      ];
    })),
    abilities: Object.fromEntries(toPairs(abilities.getAbilities()).map(([abilityName, ability]) => {
      return [
        abilityName,
        formatter.formatAbilityForApiResponse(ability),
      ];
    })),
    classes: Object.fromEntries(toPairs(classes.getClasses()).map(([className, genders]) => {
      return [
        className,
        Object.fromEntries(
          toPairs(genders).map(([gender, clazz]) => {
            return [
              gender,
              formatter.formatClassGenderForApiResponse(clazz),
            ];
          }),
        ),
      ];
    })),
    statuses: statuses.getStatuses(),
    monsterSkills: Object.fromEntries(toPairs(monsterSkills.getAllMonsterSkills()).map(([monsterName, skills]) => {
      return [
        monsterName.replace(/ /g, ''),
        skills
      ];
    }),
  })
});

const responseFor = async (tournamentId, team1, team2) => {
  const formatter = new ApiFormatter(false, false);
  const maps = await data.getMapsForTournament(tournamentId);
  const [team1Record, team2Record] = await data.getTeamsForTournament(tournamentId, team1, team2);
  const unitFormatter = (team) => (unit) => {
    const spacelessClassName = unit.class.replace(' ', '');
    const className = spacelessClassName.startsWith('Calculator') ? 'Calculator' : spacelessClassName;
    const unitItems = unit.UnitEquipments.map((e) => items.getItems()[e.name]);
    const totalStats = stats.totalStatsForClassAndEquipment(classes.getClasses()[className][unit.gender].baseStats, unitItems, unit.moveSkill);
    return {
      ...formatter.formatUnitForApiResponse(tournamentId, team, unit),
      stats: totalStats,
    }
  }

  return {
    match: {
      team1: {
        name: team1,
        units: team1Record.Units.map(unitFormatter(team1)),
      },
      team2: {
        name: team2,
        units: team2Record.Units.map(unitFormatter(team2)),
      },
      matchNumber: matchNumberForMatchup(team1, team2)
    },
    tournament: {
      tournamentId,
      maps: maps.map(({ number, title, order }) => ({ number, title, order })),
    }
  };
}

router.get('/match', async (_, res) => {
  const tournamentId = await data.getLatestTournamentId();
  const [team1, team2] = await data.getLatestMatchForTournamentId(tournamentId);
  res.json(
    await responseFor(tournamentId, team1, team2),
  );
});

router.get('/match/:tournamentId/:team1/:team2', async (req, res) => {
  const {
    tournamentId, team1, team2
  } = req.params;
  res.json(
    await responseFor(tournamentId, team1, team2),
  );
});

module.exports = router;