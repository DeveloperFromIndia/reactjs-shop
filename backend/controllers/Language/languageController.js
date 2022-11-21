import ApiError from "../../Error/ApiError.js";
import { Language } from "../../models/models.js";

class LanguageController {
    async add(req, res, next) {
        const { title } = req.query;

        if(title !== undefined && title.length > 0) {
            try {
                const lang = await Language.create({title});
                return res.json(lang);
            } catch (e) {
                return next(ApiError.forbidden("VALUE ALREADY EXISTS"));
            }
        } else {
            return next(ApiError.badRequest("INSERT VALUE"));
        }
    } 
    
    async get(req, res, next) {
        try {
            const { id } = req.query;
            if (!id) {
                const langs = await Language.findAll();
                return res.json(langs);
            } else {
                const lang = await Language.findByPk(id);
                return res.json(lang);
            }
        } catch (e) {
            return next(ApiError.forbidden("SOMETHINK WENT WRONG"));
        }
    }

    async delete(req,res,next) {

    }
}

export default new LanguageController();