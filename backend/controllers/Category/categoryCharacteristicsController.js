import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Category_characteristics } from "../../models/models.js";



class CategoryCharacteristicsController {
    async add(req, res, next) {
        try {
            const { categoryId, characteristicsId } = req.query;
            return categoryId && characteristicsId ? await Category_characteristics.create({ categoryId, characteristicsId }) : next(ApiError.badRequest("VALUES NULL OR UNDEFINED"));
        } catch (e) {
            return next(ApiError.badRequest(e));
        }
    }
    async delete(req,res,next) {

    }
    async get(req,res,next) {

    }
}


export default new CategoryCharacteristicsController();