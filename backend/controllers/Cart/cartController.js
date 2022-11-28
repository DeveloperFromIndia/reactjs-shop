import ApiError from "../../Error/ApiError.js";
import { Cart } from "../../models/models.js";

class CartController {
    async add(req, res, next) {
        try {
            const { userId } = req.query;
            const cart = !userId ? null : await Cart.create({ userId });
            return cart === null ? next(ApiError.forbidden("USER NOT FOUND")) : res.json(cart);
        } catch (e) {
            return next(ApiError.badRequest("USER HAS CART"));
        }
    } 
    
    async get(req, res, next) { 
        try {
            const { userId } = req.query;
            const cart = await Cart.findAll({where:{userId}});
            return res.json(cart);
        } catch (error) {
            return next(ApiError.badRequest("CART NOT FOUND"));
        }
    }

    async delete(req,res,next) {

    }
}

export default new CartController();