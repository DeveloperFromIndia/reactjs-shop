import { Category } from "../../models/models.js";
import ApiError from "../../Error/ApiError.js";



class CategoryController {
    async create(req, res, next) {
        try {
            const { categoryId } = req.query;
            const category = await Category.create({categoryId});
            return res.json(category);
        } catch (e) {
            return next(ApiError.badRequest('VALUES ESXISTS'));
        }
    } 

    async get(req, res) {
        const category = await Category.findAll();
        return res.json(category);
    }
    async delete(req, res) {
        
    }
}

export default new CategoryController();