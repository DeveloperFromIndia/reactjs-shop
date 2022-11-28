import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Category_keyword } from "../../models/models.js";



class CategoryKeywordController {
    async add(req,res,next) {
        try {
            const { value, categoryTranslateId } = req.query;
            const result = !value && !categoryTranslateId ? next(ApiError.badRequest("VALUES NOT EXISTS")) : await Category_keyword.create({ value: value.replace(/\s+/g, ' ').trim(), categoryTranslateId});
            return res.json(result); 
        } catch (e) {
            return next(ApiError.badRequest({error: e})); 
        }
    }
    async delete(req,res,next) {
        try {
            const { id } = req.query;

            const keyword = !id ? null : await Category_keyword.findByPk(id);
            return keyword !== null ? res.json(keyword.destroy()) : next(ApiError.badRequest("KEYWORD NOT FOUND"));
        } catch (e) {
            return next(ApiError.badRequest({error: e})); 
        }
    }
    async get(req,res,next) {
        try {
            const { id, categoryTranslateId } = req.query;

            const keyword = !id ? await Category_keyword.findAll({ where:{categoryTranslateId} }) : await Category_keyword.findByPk(id);
            return keyword !== null || keyword.length > 0 ? res.json(keyword) : next(ApiError.badRequest("KEYWORD NOT FOUND"));
        } catch (e) {
            return next(ApiError.badRequest({error: e}));
        }
    }
}


export default new CategoryKeywordController();