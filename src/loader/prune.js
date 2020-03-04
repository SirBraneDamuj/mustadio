const { Op } = require('sequelize');
const moment = require('moment');
const {
    Tournament,
    TournamentMap,
    TournamentWinner,
    Team,
    Unit,
    UnitAbility,
    UnitEquipment,
} = require('../models');
const CADENCE = 10 * 60 * 1000; // 10 minutes

const models = [
    Tournament,
    TournamentMap,
    TournamentWinner,
    Team,
    Unit,
    UnitAbility,
    UnitEquipment,
];

const prune = async () => {
    try {
        for (const model of models) {
            model.destroy({
                where: {
                    createdAt: {
                        [Op.lt]: moment().subtract(4, 'hours'),
                    },
                },
            })
        }
    } catch (err) {
        console.log(err);
    }
    setTimeout(prune, CADENCE);
}

module.exports.pruneData = () => {
    setTimeout(prune, CADENCE);
};