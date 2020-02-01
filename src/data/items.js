const fs = require('fs');
const { EQUIPMENT_SLOTS } = require('./constants');
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

const loadItemsFromDumpFile = (slot) => {
    const dump = fs.readFileSync(`${__dirname}/../../resources/dump/${slot}_items.txt`, 'utf-8');
    let delimiter = '\r\n';
    if (dump.indexOf(delimiter) == -1) {
        delimiter = '\n';
    }
    return dump.split(delimiter).map((itemLine) => {
        const firstColon = itemLine.indexOf(':');
        const name = itemLine.slice(0, firstColon);
        const info = itemLine.slice(firstColon + 2);

        return [name, { 
            name, 
            slot,
            info,
            emoji: emojiForSlot(slot),
        }];
    });
}

const ITEMS = EQUIPMENT_SLOTS.reduce((accumulator, slot) => {
    loadItemsFromDumpFile(slot).forEach(([itemName, itemInfo]) => {
        accumulator[itemName] = itemInfo;
    });
    return accumulator;
}, {});

module.exports.getItems = () => ITEMS;
module.exports.getItem = (itemName) => ITEMS[itemName];