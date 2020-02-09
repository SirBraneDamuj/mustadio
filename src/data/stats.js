const forOwn = require('lodash/forOwn');

const baseStats = {
    cEvPercent: 0,
    sPhysEvPercent: 0,
    sMagEvPercent: 0,
    aPhysEvPercent: 0,
    aMagEvPercent: 0,
    hp: 0,
    mp: 0,
    speed: 0,
    move: 0,
    jump: 0,
    pa: 0,
    ma: 0,
    initialStatuses: [],
    permStatuses: [],
};

module.exports.totalStatsForClassAndEquipment = (classStats, items) => {
    const totalStats = {
        ...baseStats,
        initialStatuses: [],
        permStatuses: [],
    };
    for (const item of items) {
        const itemStats = item.stats;
        if (item.type === 'Shield') {
            totalStats.sPhysEvPercent += itemStats.physEvadePercent;
            totalStats.sMagEvPercent += itemStats.magicEvadePercent;
        } else if (item.type === 'Accessory') {
            totalStats.aPhysEvPercent += itemStats.physEvadePercent;
            totalStats.aMagEvPercent += itemStats.magicEvadePercent;
        }
        forOwn(itemStats, (value, stat) => {
            if (Array.isArray(totalStats[stat])) {
                totalStats[stat] = totalStats[stat].concat(value);
            } else if (!stat.toLowerCase().includes('evade') && stat !== 'range' && !stat.toLowerCase().includes('wp') && stat !== 'element') {
                totalStats[stat] += value;
            }
        });
    }
    forOwn(classStats, (value, stat) => {
        if (stat === 'cEvPercent') {
            totalStats['cEvPercent'] = value;
        } else {
            totalStats[stat] += value;
        }
    });
    return totalStats;
};