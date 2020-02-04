if (process.env.DB_DATA_STRATEGY === 'real') {
    module.exports = require('./real');
} else {
    module.exports = require('./fake');
}
