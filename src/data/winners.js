const sequelize = require('sequelize');
const { Op } = sequelize;
const client = require('../client/fftbg');
const { Tournament, TournamentWinner } = require('../models');

const CADENCE = 1000 * 10;

const parseWinners = (winnersData) => {
    if (winnersData === '') {
        return [];
    }
    let delimiter = '\r\n';
    if (!winnersData.includes(delimiter)) {
        delimiter = '\n'
    }
    return winnersData.split(delimiter).filter((s) => s !== '');
};

const loadTournamentWinners = async (tournament) => {
    const { data } = await client.tournamentWinners(tournament.label);
    const winners = parseWinners(data);
    for (const [index, winner] of winners.entries()) {
        await TournamentWinner.findOrCreate({
            where: {
                TournamentId: tournament.id,
                name: winner,
                matchNum: index,
            },
        });
    }
}

const checkWinners = async () => {
    try {
        const unfinishedTournaments = await Tournament.findAll({
            attributes: ['id', 'label'],
            group: ['Tournament.id', 'Tournament.label'],
            having: sequelize.where(sequelize.fn('count', 1), '<', 8),
            where: {
                label: {
                    [Op.gte]: 'tournament_1580493563486', // this is the first tournament that has a winners file. We shouldn't even bother loading earlier ones.
                },
            },
            include: [{
                model: TournamentWinner,
                attributes: [],
            }],
        });
        for (const tournament of unfinishedTournaments) {
            await loadTournamentWinners(tournament);
        } 
    } catch (err) {
        console.log(err);
    }
    setTimeout(checkWinners, CADENCE);
};

module.exports.loadWinnersForTournament = async (label) => {
    const tournament = await Tournament.findOne({
        where: {
            label,
        },
    });
    await loadTournamentWinners(tournament);
}

module.exports.monitorWinners = () => {
    setTimeout(
        checkWinners,
        CADENCE,
    );
};