const client = require('../client/fftbg');

const { SLOTS_FOR_EQUIPMENT_TYPES } = require('./constants');

const items = {};

const loadItemsFromDumpFile = async (force) => {
    if (!force && Object.keys(items).length > 0) {
        return items;
    }
    const { data } = await client.itemInfo();
    let delimiter = '\r\n';
    if (data.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    data.split(delimiter).forEach((itemLine) => {
        const firstColon = itemLine.indexOf(':');
        const name = itemLine.slice(0, firstColon);
        const info = itemLine.slice(firstColon + 2);
        const [stats] = info.split('. ');
        const statsTokens = stats.split(', ');
        const type = statsTokens[statsTokens.length - 1].replace('.', '');
        if (type === 'Shuriken' || type === 'Bomb' || type === 'Consumable') {
            return;
        }
        const slot = SLOTS_FOR_EQUIPMENT_TYPES[type];
        items[name] = { 
            name, 
            slot,
            info,
        };
    });
    return items;
}

module.exports.getItems = async () => loadItemsFromDumpFile(false);
module.exports.getItem = async (itemName) => (await loadItemsFromDumpFile(false))[itemName];
module.exports.setAutoReload = (duration) => setInterval(() => loadItemsFromDumpFile(true), duration)