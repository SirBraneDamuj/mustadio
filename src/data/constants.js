module.exports.EQUIPMENT_SLOTS = ['hand', 'head', 'body', 'accessory'];
module.exports.EQUIPMENT_TYPES_FOR_SLOT = {
    'hand': ['Knife', 'Ninja Blade', 'Sword', 'Knight Sword', 'Katana', 'Axe', 'Rod', 'Staff', 'Flail', 'Gun', 'Crossbow', 'Bow', 'Harp', 'Book', 'Spear', 'Pole', 'Bag', 'Fabric', 'Shield'],
    'head': ['Helmet', 'Hat'],
    'body': ['Armor', 'Clothes', 'Robe'],
    'accessory': ['Accessory'],
};
module.exports.SLOTS_FOR_EQUIPMENT_TYPES = this.EQUIPMENT_SLOTS.reduce((accumulator, slot) => {
    this.EQUIPMENT_TYPES_FOR_SLOT[slot].forEach((type) => {
        accumulator[type] = slot;
    });
    return accumulator;
}, {});
module.exports.GENDERS = ['Male', 'Female', 'Monster'];


module.exports.TEAM_NAMES = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'purple', 'brown', 'champion'];
module.exports.MATCHUPS = [
    // ROUND 1
    [
        [this.TEAM_NAMES[0], this.TEAM_NAMES[1]]
    ],
    [
        [this.TEAM_NAMES[2], this.TEAM_NAMES[3]]
    ],
    [
        [this.TEAM_NAMES[4], this.TEAM_NAMES[5]]
    ],
    [
        [this.TEAM_NAMES[6], this.TEAM_NAMES[7]]
    ],
    // ROUND 2
    [
        [this.TEAM_NAMES[0], this.TEAM_NAMES[2]],
        [this.TEAM_NAMES[0], this.TEAM_NAMES[3]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[2]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[3]],
    ],
    [
        [this.TEAM_NAMES[4], this.TEAM_NAMES[6]],
        [this.TEAM_NAMES[4], this.TEAM_NAMES[7]],
        [this.TEAM_NAMES[5], this.TEAM_NAMES[6]],
        [this.TEAM_NAMES[5], this.TEAM_NAMES[7]],
    ],
    // ROUND 3
    [
        [this.TEAM_NAMES[0], this.TEAM_NAMES[4]],
        [this.TEAM_NAMES[0], this.TEAM_NAMES[5]],
        [this.TEAM_NAMES[0], this.TEAM_NAMES[6]],
        [this.TEAM_NAMES[0], this.TEAM_NAMES[7]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[4]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[5]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[6]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[7]],
        [this.TEAM_NAMES[2], this.TEAM_NAMES[4]],
        [this.TEAM_NAMES[2], this.TEAM_NAMES[5]],
        [this.TEAM_NAMES[2], this.TEAM_NAMES[6]],
        [this.TEAM_NAMES[2], this.TEAM_NAMES[7]],
        [this.TEAM_NAMES[3], this.TEAM_NAMES[4]],
        [this.TEAM_NAMES[3], this.TEAM_NAMES[5]],
        [this.TEAM_NAMES[3], this.TEAM_NAMES[6]],
        [this.TEAM_NAMES[3], this.TEAM_NAMES[7]],
    ],
    // ROUND 4
    [
        [this.TEAM_NAMES[0], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[1], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[2], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[3], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[4], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[5], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[6], this.TEAM_NAMES[8]],
        [this.TEAM_NAMES[7], this.TEAM_NAMES[8]],
    ],
];

module.exports.matchNumberForMatchup = (team1, team2) => {
    return this.MATCHUPS.findIndex((match) => match.some(([t1, t2]) => t1 === team1 && t2 === team2));
};