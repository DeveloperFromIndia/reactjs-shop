import ApiError from "../../Error/ApiError.js";
import { Characteristics_translate } from "../../models/models.js"; 

class CharacteristicsController {
    async add(req, res, next) {
        try {
            const { value, decimal, about, characteristicId, languageId } = req.query;
            return res.json(await Characteristics_translate.create({value, decimal, about, characteristicId, languageId})); 
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }
    async get(req, res, next) {
        try {
            const { characteristicId, languageId } = req.query;
            let translate = null;
            if (characteristicId && languageId) {
                translate = await Characteristics_translate.findAll({where: { characteristicId, languageId }});
            } else if (characteristicId && !languageId) {
                translate = await Characteristics_translate.findAll({where: { characteristicId }});
            } 
            return translate !== null && translate.length > 0 ? res.json(translate) : next(ApiError.badRequest("TRANSLATE NOT FOUND"));
        } catch (e) {
            return next(ApiError.badRequest({error: e})); 
        }
    }
    async delete(req, res, next) {
        try {
            const { characteristicId, languageId } = req.query;
            const translate = characteristicId && languageId ? await Characteristics_translate.findOne({where: { characteristicId, languageId }}) : null;
            return translate !== null ? res.json(translate.destroy()) : next(ApiError.badRequest(e)); 
        } catch (e) {
            return next(ApiError.badRequest(e)); 
        }
    }
}

export default new CharacteristicsController();