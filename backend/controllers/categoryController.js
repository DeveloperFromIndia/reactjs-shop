import { Category } from "../models/models.js";
import ApiError from "../Error/ApiError.js";


// Category_img
// Category_characteristics
// Category_keyword
// Category_translate

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
    async getAll(req, res) {
        const category = await Category.findAll();
        return res.json(category);
    }
    async get(req, res) {

    }
}

export default new CategoryController();