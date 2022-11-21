import { Brand } from "../../models/models.js";


class BrandController {
    async create(req, res, next) {
        try {
            const { value, country } = req.query;

            const brand = await Brand.create({value, country});
            
            return res.json(brand);
        } catch (e) {
            return next(ApiError.badRequest('VALUES ESXISTS'));
        }
    } 
    
    async getAll(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async get(req, res) {
        
    }
}

export default new BrandController();
