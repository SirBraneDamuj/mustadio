const client = require('../client/hacktics');
const fs = require('fs');

const loadMaps = async (path) => {
    const maps = [...Array(119).keys(), 125];
    for (const map of maps) {
        for (const index of [0, 1, 2, 3, 4]) {
            const filename = `${map}_${index}.gif`;
            const response = await client.getMap(filename);
            if (response) {
                await response.data.pipe(fs.createWriteStream(`${path}/${filename}`));
            }
        }
    }
}

loadMaps(process.argv[2])
