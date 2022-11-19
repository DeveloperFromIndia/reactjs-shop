import UUID  from "uuid";
import path from "path";
import { Product } from "../models/models.js";
import { Product_img } from "../models/models.js";

class ProductController {
    async create(req, res) {
        const { vendor_code, 
            price, price_old, 
            amount, min_order_amount, max_order_amount, 
            hiden } = req.body;

        const { img } = req.files;
        let file_name = UUID.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', file_name));
        if (false) {
            const product = await Product.create({vendor_code, price, price_old,amount, min_order_amount, max_order_amount});
            const product_img = await Product_img.create({});
        }
    } 
    async getAll(req, res) {
        
    }
    async get(req, res) {
        
    }
}

export default new ProductController();