import { Currencies } from "../../models/models.js";
import ApiError from "../../Error/ApiError.js";


class СurrenciesController {
    async add(req, res, next) {
        try {
            const {value , sign} = req.query;
            return value !== undefined && sign !== undefined && value > 0 && sign.length > 0 ? res.json(await Currencies.create({value, sign})) : next(ApiError.badRequest("VALUE ALREADY EXISTS"))
        } catch (e) {
            return next(ApiError.badRequest("INSERT MORE ARGUMENTS"));
        }
    }
    
    async get(req, res, next) {
        try {
            const { id } = req.query;
            const curr = !id ? await Currencies.findAll() : await Currencies.findByPk(id);
            return curr !== null ? res.json(curr) : next(ApiError.badRequest("CURRENCIES NOT FOUND"));
        } catch (e) {
            return next(ApiError.badRequest("SOMETHINK WENT WRONG"));
        }
    }
    
    async delete(req, res, next) {
        try {
            const { id } = req.query;
            const curr = !id ? await Currencies.findByPk(id) : null;
            return curr === null ? next(ApiError.badRequest("error")) : console.log(curr);
        } catch (e) {
            return next(ApiError.badRequest("SOMETHINK WENT WRONG"));
        }
    }
}

export default new СurrenciesController();
