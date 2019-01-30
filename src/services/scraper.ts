import * as request from "request-promise-native";
import {ShowEntity} from "../entities/show";
import {ShowRepository} from "../repositories/show";
import {CastEntity} from "../entities/cast";
import {CastRepository} from "../repositories/cast";

export class ScraperService {

    importShows(page: number) {
        let showRepo: ShowRepository = new ShowRepository();

        console.log(page);
        let config = {
            uri: 'http://api.tvmaze.com/shows?page=' + page,
            resolveWithFullResponse: true
        }
        request.get(config).then((result: any) => {
            let shows = JSON.parse(result.body);

            // try again in x seconds
            if (result.statusCode != 200) {
                setTimeout(() => {
                    this.importShows(page);
                }, 10000);
            }

            // stop when no shows anymore
            if (shows.length === 0) {
                console.log('Importing Done');
                return;
            }

            for (let showIndex in shows) {
                let show = shows[showIndex];

                let newShow:ShowEntity = new ShowEntity();
                newShow.id = show.id;
                newShow.name = show.name;

                // will add only row if not exist
                showRepo.saveShow(newShow).then((result: any) => {
                    this.importCastForShow(newShow);
                }).catch(() => {});
            }

            // go to next page
            page++;
            this.importShows(page);
        }).catch(() => {
            setTimeout(() => {
                this.importShows(page);
            }, 10000);
        });
    }

    importCastForShow(newShow: ShowEntity) {
        let castRepo: CastRepository = new CastRepository();
        let config = {
            uri: 'http://api.tvmaze.com/shows/' + newShow.id + '/cast',
            resolveWithFullResponse: true
        }
        request.get(config).then((result: any) => {
            let cast = JSON.parse(result.body);

            // try again in x seconds
            if (result.statusCode != 200) {
                setTimeout(() => {
                    this.importCastForShow(newShow);
                }, 10000);
            }

            for (let castIndex in cast) {
                let actor = cast[castIndex].person;
                let newCast:CastEntity = new CastEntity();
                newCast.id = actor.id;
                newCast.name = actor.name;
                newCast.birthday = actor.birthday;
                newCast.shows = [newShow];

                // will add only row if not exist
                castRepo.saveCast(newCast).then((result: any) => {
                }).catch(() => {});
            }

        }).catch(() => {
            setTimeout(() => {
                this.importCastForShow(newShow);
            }, 10000);
        });
    }
}
export var Scraper = new ScraperService();