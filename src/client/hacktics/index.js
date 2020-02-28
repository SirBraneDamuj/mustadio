const axios = require('axios');
const config = require('../../config');

const client = axios.create({
    baseURL: config.HACKTICS_BASE_URL,
    responseType: 'stream',
});

module.exports.getMap = async (filename) => {
    try {
        console.log(filename);
        const response = await client.get(filename);
        return response;
    } catch (err) {
        console.log(`ERROR hacktics filename ${filename}`);
        console.log(err);
        return null;
    }
}