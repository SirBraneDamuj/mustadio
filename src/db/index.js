if (process.env.FFTBG_DATA_STRATEGY === 'real') {
    module.exports = require('./real');
} else {
    module.exports = require('./fake');
}
