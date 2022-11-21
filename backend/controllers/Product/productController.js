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
            console.error(e);
            return next(ApiError.badRequest("VALUE ALREADY EXISTS"));
        }
    } 
    async getAll(req, res) {
        const { brandId, categoryId } = req.query;
        let products = null;
        
        if(!brandId && !categoryId) {
            products = await Product.findAll();
        } 
        else if (brandId && !categoryId) {
            products = await Product.findAll({where:{ brandId }});
        }   
        else if (categoryId && !brandId) {
            products = await Product.findAll({where:{ categoryId }});
        }
        

        return res.json({msg: categoryCharacteristicsId})

        // return res.json(products);
    }
    async get(req, res) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('VALUE UNDEFINED OR NULL'));
        } else {
            const product = await Product.findAll(id); // idk
            return res.json(product);
        }
    }
}

export default new ProductController();