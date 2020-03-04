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
const CADENCE = 90 * 1000; // 10 minutes

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
    const threshold = moment().subtract(4, 'hours').toDate();
    console.log(`Pruning database before ${threshold}`);
    try {
        for (const model of models) {
            await model.destroy({
                where: {
                    createdAt: {
                        [Op.lt]: threshold,
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