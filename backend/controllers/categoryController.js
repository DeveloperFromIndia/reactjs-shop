import { Category } from "../models/models.js";
import ApiError from "../Error/ApiError.js";

class CategoryController {
    async create(req, res) {
        const { parent_id } = req.body;
        if (!parent_id) {
            return next(ApiError.badRequest('Uninit parent_id'));
        }
    } 
    async getAll(req, res) {
        
    }
}

export default new CategoryController();