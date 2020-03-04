const { Op } = require('sequelize');
const moment = require('moment');
const { Tournament } = require('../models');
const CADENCE = 10 * 60 * 1000; // 10 minutes

const prune = async () => {
    try {
        Tournament.destroy({
            where: {
                createdAt: {
                    [Op.lt]: moment().subtract(4, 'hours'),
                },
            },
        });
    } catch (err) {
        console.log(err);
    }
    setTimeout(prune, CADENCE);
}

module.exports.pruneData = () => {
    setTimeout(prune, CADENCE);
}