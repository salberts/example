import "reflect-metadata";
import {ConnectionOptions} from "typeorm";

export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "",
    password: "",
    database: "",
    entities: [
         "./entities/*.js"
    ],
    synchronize: true,
    // logging: ["query", "error"],
}

export let pageSettings = {
   pageSize: 10
}

export let scraperSettings = {
    showApiUrl: 'http://api.tvmaze.com/shows',
    waitTimeInSecondsAfterError: 10
}