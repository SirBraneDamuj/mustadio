const fs = require('fs');

const splitFile = (filename) => {
    const raw = fs.readFileSync(filename, 'utf-8');
    let delimiter = '\r\n';
    if (raw.indexOf(delimiter) === -1) {
        delimiter = '\n';
    }
    return raw.split(delimiter);
};

const items = new Set(splitFile(`${__dirname}/../../resources/notables/items.txt`));
const abilities = new Set(splitFile(`${__dirname}/../../resources/notables/abilities.txt`));

const outside = (v, min, max) => v < min || v > max;

const brave = (b) => outside(parseInt(b, 10), 50, 70)
const faith = (f) => outside(parseInt(f, 10), 50, 70);

module.exports = {
    items,
    abilities,
    brave,
    faith,
};
