import ApiError from "../../Error/ApiError.js";
import { Language } from "../../models/models.js";

class LanguageController {
    async add(req, res, next) {
        try {
            const { title } = req.query;
            return title === undefined || title.length < 1 ? next(ApiError.badRequest("INSERT VALUE")) : res.json(await Language.create({title}));  
        } catch (e) {
            return next(ApiError.forbidden("VALUE ALREADY EXISTS"));
        }
    } 
    
    async get(req, res, next) {
        try {
            const { id } = req.query;
            const lang = !id ? await Language.findAll() : await Language.findByPk(id); 
            return res.json(lang);
        } catch (e) {
            return next(ApiError.forbidden("SOMETHINK WENT WRONG"));
        }
    }

    async delete(req,res,next) {
        try {
            const { id } = req.query;
            const lang = !id ? undefined : await Language.findByPk(id); 
            return !lang ? next(ApiError.badRequest("LANG NOT FOUND")) : lang.destroy(), res.json({status:"ok"});
        } catch (e) {
            return next(ApiError.forbidden("SOMETHINK WENT WRONG"));
        }    
    }
}

export default new LanguageController();