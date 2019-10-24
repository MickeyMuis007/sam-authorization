import bodyParser from "body-parser";
import colors from "colors";
import dotenv from "dotenv";
import express from "express";

import mongoConnect from "./infrasturcture/dbs/mongodb/mongo.connect";
import authMiddlewareRouter from "./presentation/middlewares/auth-routes.middleware";

// Set configuration
dotenv.config();
colors.setTheme({});

// Import config: should do this after dotenv was set env variables
import config from "./config";
console.log("config: ".yellow, colors.yellow(config));

// Connect to MongoDB with mongoose
mongoConnect();

// Express server
const app = express();
app.listen(config.node_port, () => {
  console.log(`Successfully running ${config.app_name} lisiting on port ${config.node_port}`.green);
});

// Middleware
app.use(bodyParser.json());
app.use(authMiddlewareRouter);

// Routes
app.get("/hello", (req: any, res: any) => {
  res.send("Hello World!");
});
