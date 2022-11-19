import { Currencies } from "../models/models.js";
import ApiError from "../Error/ApiError.js";


class СurrenciesController {
    async create(req, res, next) {
        const { value, sign } = req.query;

        if(value !== undefined && sign !== undefined && value > 0 && sign.length === 1) {
            try {
                const curr = await Currencies.create({value, sign});
                return res.json(curr);
            } catch (e) {
                return next(ApiError.forbidden("VALUE ALREADY EXISTS"));
            }
        } else {
            return next(ApiError.badRequest("INSERT VALUE"));
        }
    } 
    
    async getAll(req, res, next) {

    }

    async get(req, res, next) {
        
    }
}

export default new СurrenciesController();
