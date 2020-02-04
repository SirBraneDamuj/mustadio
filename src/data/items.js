const client = require('../client/fftbg');

const { SLOTS_FOR_EQUIPMENT_TYPES } = require('./constants');
const emojiForSlot = (slotName) => {
    switch (slotName) {
        case 'head':
        return '&#x1F3A9;';
        case 'hand':
        return '&#x270B;';
        case 'body':
        return '&#x1F455;';
        case 'accessory':
        return '&#x1F48D;';
        default:
        return '&#x129409;'
    }
}

const loadItemsFromDumpFile = async () => {
    const { data } = await client.itemInfo();
    let delimiter = '\r\n';
    if (data.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    return data.split(delimiter).reduce((accumulator, itemLine) => {
        const firstColon = itemLine.indexOf(':');
        const name = itemLine.slice(0, firstColon);
        const info = itemLine.slice(firstColon + 2);
        const [stats] = info.split('. ');
        const statsTokens = stats.split(', ');
        const type = statsTokens[statsTokens.length - 1];
        const slot = SLOTS_FOR_EQUIPMENT_TYPES[type];
        accumulator[name] = { 
            name, 
            slot,
            info,
            emoji: emojiForSlot(slot),
        }
        return accumulator;
    }, {});
}

module.exports.getItems = async () => loadItemsFromDumpFile();
module.exports.getItem = async (itemName) => (await loadItemsFromDumpFile())[itemName];