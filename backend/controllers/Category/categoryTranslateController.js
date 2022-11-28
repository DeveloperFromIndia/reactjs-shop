import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Category_translate } from "../../models/models.js";



class CategoryTranslateController {
    async add(req,res,next) {
        try {
            const { title, desc, categoryId, languageId } = req.query;
            const translate = await Category_translate.create({ title, description:desc, categoryId, languageId });
            return res.json(translate);
        } catch (e) {
            return next(ApiError.badRequest("TRANSLATE EXISTS OR CATEGORY NOT FOUND"));
        }
    }
    async delete(req,res,next) {
        try {
            const { categoryId, languageId } = req.query;
            const translate = await Category_translate.findOne({where: {categoryId, languageId}});
            return  translate !== null  ? res.json(translate.destroy()) : next(ApiError.badRequest("TRANSLATE NOT FOUND"));
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    }
    async get(req,res,next) {
        try {
            const { categoryId, languageId } = req.query;
            const translate = await Category_translate.findOne({where: {categoryId, languageId}});
            return  translate !== null ? res.json(translate) : next(ApiError.badRequest("TRANSLATE NOT FOUND"));
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    }
}


export default new CategoryTranslateController();