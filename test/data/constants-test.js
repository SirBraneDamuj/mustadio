const constants = require('../../src/data/constants');

const expect = require('chai').expect;

describe('SLOTS_FOR_EQUIPMENT_TYPE', () => {
    const subject = constants.SLOTS_FOR_EQUIPMENT_TYPES;

    it('reverses the EQUIPMENT_TYPES_FOR_SLOT map', () => {
        constants.EQUIPMENT_SLOTS.forEach((slot) => {
           constants.EQUIPMENT_TYPES_FOR_SLOT[slot].forEach((itemType) => {
               expect(subject[itemType]).to.eq(slot);
           });
        });
    });
});