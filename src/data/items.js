const client = require('../client/fftbg');
const mapValues = require('lodash/mapValues');

const { SLOTS_FOR_EQUIPMENT_TYPES } = require('./constants');

const number = (s) => {
    if (s === undefined || s === null || s === '') {
        return 0;
    } else {
        return parseInt(s, 10);
    }
}

const theBigRegex = /^(?<itemName>[A-Z\d][\w\d \-']+): (?:(?<wp>\d+) WP, )?(?:(?<healWp>\d+) WP \(heal\), )?(?:(?<absorbWp>\d+) WP \(absorb\), )?(?:(?<range>\d+) range, )?(?:(?<evadePercent>\d+%) evade, )?(?:(?<physEvadePercent>\d+%) phys evade, )?(?:(?<magicEvadePercent>\d+%) magic evade, )?(?:\+(?<hp>\d+) HP, )?(?:\+(?<mp>\d+) MP, )?(?:(?<itemType>[A-Z][\w -]+). ?)(?:(Element: (?<element>[A-Z]\w+))\. ?)?(?:Effect: (?<effect>.*))?$/;
const statsRegex = /(?:(?<move>\+\d+) Move(?:, |\.|;))?(?:(?<pa>\+\d+) PA(?:, |\.|;))?(?:(?<ma>\+\d+) MA(?:, |\.|;))?(?:(?<jump>\+\d+) Jump(?:, |\.|;))?(?:(?<speed>\+\d+) Speed(?:, |\.|;))?/;

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
        console.log(itemLine);
        const {
            itemName,
            wp,
            healWp,
            absorbWp,
            range,
            evadePercent,
            physEvadePercent,
            magicEvadePercent,
            hp,
            mp,
            itemType,
            element,
            effect,
        } = theBigRegex.exec(itemLine).groups;
        if (itemType === 'Shuriken' || itemType === 'Bomb' || itemType === 'Consumable') {
            return;
        }
        const {
            speed,
            move,
            jump,
            pa,
            ma
        } = statsRegex.exec(effect).groups;
        const slot = SLOTS_FOR_EQUIPMENT_TYPES[itemType];
        const firstColon = itemLine.indexOf(':');
        const info = itemLine.slice(firstColon + 2);
        items[itemName] = { 
            name: itemName, 
            type: itemType,
            slot,
            info,
            stats: mapValues({
                wp: number(wp),
                healWp: number(healWp),
                absorbWp: number(absorbWp),
                range: number(range),
                evadePercent: number(evadePercent),
                physEvadePercent: number(physEvadePercent),
                magicEvadePercent: number(magicEvadePercent),
                hp: number(hp),
                mp: number(mp),
                element,
                speed: number(speed),
                move: number(move),
                jump: number(jump),
                pa: number(pa),
                ma: number(ma),
            }),
        };
    });
    return items;
}

module.exports.getItems = async () => loadItemsFromDumpFile(false);
module.exports.getItem = async (itemName) => (await loadItemsFromDumpFile(false))[itemName];
module.exports.setAutoReload = (duration) => setInterval(() => loadItemsFromDumpFile(true), duration)