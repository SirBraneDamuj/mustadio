const config = require("../config");

if (config.DB_DATA_STRATEGY === "real") {
  module.exports = require("./real");
}
