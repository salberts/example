import { getManager } from "typeorm";
import {CastEntity} from "../entities/cast";

export class CastRepository {

    getAllCast() {
        return getManager().getRepository(CastEntity).find();
    }

    saveCast(cast: CastEntity) {
        return getManager().getRepository(CastEntity).save(cast);
    }

}