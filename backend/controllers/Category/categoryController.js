import { Category } from "../../models/models.js";
import ApiError from "../../Error/ApiError.js";
import { where } from "sequelize";



class CategoryController {
    async create(req, res, next) {
        try {
            const { categoryId } = req.query;
            const category = await Category.create({categoryId});
            return res.json(category);
        } catch (e) {
            return next(ApiError.badRequest("VALUES ESXISTS OR WRONG PARENT ID"));
        }
    }
    
    async get(req, res) {
        try {
            const { id, categoryId } = req.query;
            if (!id && !categoryId) {
                return res.json(await Category.findAll());
            }      
            else if (id && !categoryId) {
                return res.json(await Category.findByPk(id));
            }
            else if (!id && categoryId) {
                return res.json(await Category.findAll({where:{categoryId}}));
            } else {
                return next(ApiError.badRequest("SOMETHINK WENT WRONG"));
            }
        } catch (e) {
            return next(ApiError.badRequest({error: e}));
        }
    }
    
    async delete(req, res) {
        try {
            const { id } = req.query;
            const category = !id ? null : await Category.findByPk(id);
            return category === null ? next(ApiError.badRequest("CATEGORY NOT FOUND")) : res.json(category.destroy());
        } catch (e) {
            return next(ApiError.badRequest({error: e}));
        }
    }
}

export default new CategoryController();