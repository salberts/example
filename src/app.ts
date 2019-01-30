import * as express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as appConfig from "./common/app-config";

/**
 * Controllers (route handlers).
 */
import {getAllShows, getShow} from "./controllers/show";

/**
 * Create server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Set express configuration.
 */
app.set("port", process.env.PORT || 3000);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

/**
 * Create routes
 */
app.get("/v1/shows", getAllShows);
app.get("/v1/shows/:showId", getShow);

/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 */
createConnection(appConfig.dbOptions).then(async connection => {
    console.log("Connected to database");

}).catch(error => console.log("Cconnection error: ", error));

module.exports = app;