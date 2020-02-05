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


module.exports.TEAM_NAMES = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'purple', 'brown', 'champion'];
module.exports.GENDERS = ['Male', 'Female', 'Monster'];