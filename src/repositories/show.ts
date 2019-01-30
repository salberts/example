import { ShowEntity } from "../entities/show";
import { getManager, MoreThan } from "typeorm";

export class ShowRepository {

    getPaginatedShowsFromId(after: number, pageSize: number) {
        return getManager().getRepository(ShowEntity).createQueryBuilder("show")
            .leftJoinAndSelect("show.cast", "cast")
            .orderBy({
                'show.id': 'ASC',
                'cast.birthday': 'DESC'
            })
            .take(pageSize)
            .where({id: MoreThan(after)})
            .getMany();
    }

    findShowById(showId: number) {
        return getManager().getRepository(ShowEntity).createQueryBuilder("show")
            .leftJoinAndSelect("show.cast", "cast")
            .orderBy({
                'show.id': 'ASC',
                'cast.birthday': 'ASC'
            })
            .where({id: showId})
            .getOne();
    }

    saveShow(show: ShowEntity) {
        return getManager().getRepository(ShowEntity).save(show);
    }

}