import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Product } from "../../models/models.js";



class ProductController {
    async create(req, res, next) {
        try {
            const { vendor_code, 
                price, price_old, 
                amount, min_order_amount, max_order_amount,
                categoryId, brandId, 
                hiden 
            } = req.query;

            const product = await Product.create({ vendor_code, 
                price, price_old, 
                amount, min_order_amount, max_order_amount, 
                categoryId, brandId,
                hiden 
            });

            return res.json(product);
        } catch(e) {
            return next(ApiError.badRequest("VALUE ALREADY EXISTS OR CATEGORY OR BRAND ID NOT EXISTS"));
        }
    } 
    async get(req, res, next) {
        try {
            const { brandId, categoryId, charactId } = req.query;
            

        } catch (e) {
            return next(ApiError.badRequest("SOMTHINK WENT WRONG"));
        }

        
    }
    async delete(req, res, next) {

    }
}

export default new ProductController();