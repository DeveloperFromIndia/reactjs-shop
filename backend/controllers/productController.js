import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Product } from "../models/models.js";
import { Product_img } from "../models/models.js";
import ApiError from "../Error/ApiError.js";


class ProductController {
    async create(req, res, next) {
        try {
            const { vendor_code, 
                price, price_old, 
                amount, min_order_amount, max_order_amount,
                category_id, brand_id, 
                hiden } = req.query;
                
            // const { img } = req.files;
            // img.mv(path.resolve(__dirname, '..', 'static', file_name));
            let file_name = uuidv4() + ".jpg";
            const product = await Product.create({vendor_code, price, price_old, min_order_amount, max_order_amount, amount, hiden, category_id, brand_id});
            // const product_img = await Product_img.create({});
            return res.json(product);
        } catch(e) {
            console.error(e);
            return next(ApiError.forbidden("error"));
        }
    } 
    async getAll(req, res) {
        
    }
    async get(req, res) {
        
    }
}

export default new ProductController();