import ApiError from "../Error/ApiError.js";
import { Language } from "../models/models.js";

class LanguageController {
    async create(req, res, next) {
        const { title } = req.query;
        if (!title || title.length > 1) {
            try {
                const lang = await Language.create({title})
                return res.json(lang);
            } catch (e) {
                return next(ApiError.forbidden("lang v db or netu title"));
            }
        } else {
            return next(ApiError.badRequest("Uninit ID"));
        }
    }

    async edit(req, res, next) {
        
    }

    async getAll(req, res) {
        const langs = await Language.findAll();
        return res.json(langs);
    }

    async get(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest("Uninit ID"));
        } 
        return res.json(id);
    }
}

export default new LanguageController();