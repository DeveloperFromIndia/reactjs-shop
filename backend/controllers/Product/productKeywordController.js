import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Product_keyword } from "../../models/models.js";



class ProductKeywordController {
    async add(req,res,next) {
        try {
            const { value, productTranslateId } = req.query;
            const result = !value && !productTranslateId ? next(ApiError.badRequest("VALUES NOT EXISTS")) : await Product_keyword.create({ value: value.replace(/\s+/g, ' ').trim(), productTranslateId});
            return res.json(result); 
        } catch (e) {
            return next(ApiError.badRequest("SOMETHINK WENT WRONG"));
        }
    }
    async get(req,res,next) {
        try {
            const { productTranslateId } = req.query;
            const keyword = await Product_keyword.findAll({where:{productTranslateId}});
            return !keyword ? next(ApiError.badRequest("KEYWORD NOT FOUND")) : res.json(keyword);
        } catch (e) {
            return next(ApiError.badRequest("SOMETHINK WENT WRONG"));
        }
    }
    async delete(req,res,next) {
        try {
            const { id } = req.query;
            const keyword = await Product_keyword.findByPk(id);
            return !keyword ? next(ApiError.badRequest("KEYWORD NOT FOUND")) : res.json(keyword.destroy());
        } catch (e) {
            return next(ApiError.badRequest("SOMETHINK WENT WRONG"));
        }
    }
}


export default new ProductKeywordController();