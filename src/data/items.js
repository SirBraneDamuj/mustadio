const DumpLoader = require('./dump-loader');
const client = require('../client/fftbg');
const mapValues = require('lodash/mapValues');

const { SLOTS_FOR_EQUIPMENT_TYPES } = require('./constants');

const number = (s) => {
    if (!s) {
        return 0;
    }
    return parseInt(s, 10);
}

const theBigRegex = /^(?<itemName>[A-Z\d][\w\d \-']+): (?:(?<wp>\d+) WP, )?(?:(?<healWp>\d+) WP \(heal\), )?(?:(?<absorbWp>\d+) WP \(absorb\), )?(?:(?<range>\d+) range, )?(?:(?<evadePercent>\d+%?) evade, )?(?:(?<physEvadePercent>\d+%) phys evade, )?(?:(?<magicEvadePercent>\d+%) magic evade, )?(?:\+(?<hp>\d+) HP, )?(?:\+(?<mp>\d+) MP, )?(?:(?<itemType>[A-Z][\w -]+). ?)(?:Element: (?<element>[A-Z]\w+)\. ?)?(?:Effect: (?<effect>.*))?$/;
const statsRegex = /(?:(?<pa>\+\d+) PA(?:, |\.|;))?(?:(?<ma>\+\d+) MA(?:, |\.|;))?(?:(?<speed>\+\d+) Speed(?:, |\.|;))?(?:(?<move>\+\d+) Move(?:, |\.|;))?(?:(?<jump>\+\d+) Jump(?:, |\.|;))?/;
const initialStatusRegex = /Initial (?<initialStatuses>[A-Z][^;.]+)(?:; |\.)/;
const permanentStatusRegex = /(?:Permanent|Always) (?<permStatuses>[A-Z][^;.]+)(?:; |\.)/;

const getInitialStatuses = (effect) => {
    const match = initialStatusRegex.exec(effect);
    if (match) {
        return match.groups.initialStatuses.split(', ');
    }
    return [];
}

const getPermStatuses = (effect) => {
    const match = permanentStatusRegex.exec(effect);
    if (match) {
        return match.groups.permStatuses.split(', ');
    }
    return [];
}

const parseDumpLine = (items, itemLine) => {
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
            initialStatuses: getInitialStatuses(effect),
            permStatuses: getPermStatuses(effect),
        }),
    };
}

const myLoader = new DumpLoader(client.itemInfo, parseDumpLine)

module.exports.getItems = () => myLoader.getData();
module.exports.getItem = (itemName) => myLoader.getData()[itemName];
module.exports.reload = async (version) => myLoader.reload(version);