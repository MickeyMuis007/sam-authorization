import _ from "lodash";
import config = require("../config/config.json");

// modules variables
// const config = conf.;
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

export default finalConfig;
