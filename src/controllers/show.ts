import { Request, Response } from "express";
import { ShowRepository } from "../repositories/show";
import { ShowEntity } from "../entities/show";
import { pageSettings } from "../common/app-config";

export let getAllShows = async (req: Request, res: Response) => {
    let showRepo: ShowRepository = new ShowRepository();

    let after = req.query.after || 0;

    showRepo.getPaginatedShowsFromId(after, pageSettings.pageSize).then((result: ShowEntity[]) => {
        res.send(result);
    });
};

export let getShow = async (req: Request, res: Response) => {
    let showRepo: ShowRepository = new ShowRepository();
    let { showId } = req.params;

    showRepo.findShowById(showId).then((show: ShowEntity) => {

        if (undefined === show) {
            res.status(404)
                .send('Show not found');
        }

        res.send(show);
    }).catch(error => console.log(error));
};