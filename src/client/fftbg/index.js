const config = require('../../config');

if (config.FFTBG_DATA_STRATEGY === 'real') {
    module.exports = require('./real');
} else {
    module.exports = require('./fake');
}
