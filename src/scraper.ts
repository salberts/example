import * as express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { scraperSettings, dbOptions } from "./common/app-config";

/**
 * Controllers (route handlers).
 */
import { Scraper } from "./services/scraper";

createConnection(dbOptions).then(async connection => {
    console.log("Connected to database");

}).catch(error => console.log("Connection error: ", error));

Scraper.importShows(0);