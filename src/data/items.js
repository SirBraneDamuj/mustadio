const fs = require('fs');
const { EQUIPMENT_SLOTS } = require('./constants');

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
            info 
        }];
    });
}

module.exports.ITEMS = EQUIPMENT_SLOTS.reduce((accumulator, slot) => {
    loadItemsFromDumpFile(slot).forEach(([itemName, itemInfo]) => {
        accumulator[itemName] = itemInfo;
    });
    return accumulator;
}, {});

module.exports.getItem = (itemName) => this.ITEMS[itemName];