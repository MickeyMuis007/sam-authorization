import colors from "color";
import _ from "lodash";
import mongoose from "mongoose";
import objectPath from "object-path";

import config from "../../../config";

const connect = () => {
  const dbStr = `${objectPath.get(config, "database.host", "http://localhost")}/${objectPath.get(config, "database.name", "")}`;
  console.log(dbStr.bgCyan);
  mongoose.connect(dbStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
    console.log(`Successfully connected to mongodb ${JSON.stringify(config.database)}`.green);
  });
};

export default connect;
