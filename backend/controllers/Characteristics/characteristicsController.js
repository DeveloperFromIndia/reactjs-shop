import ApiError from "../../Error/ApiError.js";
import { Characteristics } from "../../models/models.js"; 

class CharacteristicsController {
    async add(req, res, next) {
        try {
            return res.json(await Characteristics.create());
        } catch (e) {
            return next(ApiError.badRequest({error:e}));
        }
    }
    async get(req, res, next) {
        try {
            const { id } = req.query;
            const charact = !id ? null : await Characteristics.findByPk(id);
            return charact !== null ? res.json(charact) : next(ApiError.badRequest("CHARACTERISTICS NOT FOUND"));
        } catch (e) {
            return next(ApiError.badRequest({error:e}));
        }
    }
    async delete(req, res, next) { 
        try {
            const { id } = req.query;
            const charact = !id ? null : await Characteristics.findByPk(id);
            return charact === null ? next(ApiError("ID UNDEFINED OR NULL")) : res.json(charact.destroy());
        } catch (e) {
            return next(ApiError.badRequest({error:e}));
        }
    }
}

export default new CharacteristicsController();