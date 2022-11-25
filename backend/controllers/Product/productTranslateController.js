import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Product_translate, Language, Product } from "../../models/models.js";



class ProductTraslateController {
    async add(req,res,next) {
        try {
            const { languageId, productId, title, desc } = req.query;
            if(!title || !languageId || !productId || languageId < 0 || productId < 0) {
                return next(ApiError.badRequest("VALUES UNDEFINED OR NULL"));
            } else {
                const lang = await Language.findByPk(languageId);
                const product = await Product.findByPk(productId);
                if (lang !== null || product !== null) {
                    const result = await Product_translate.create({title, description: desc, languageId, productId}); 
                    return res.json(result);
                } else {
                    return next(ApiError.badRequest("LANGUAGE OR PRODUCT NOT EXISTS"));
                }
            }
        } catch (e) {
            return next(ApiError.forbidden("VALUE EXISTS"));
        }
    }

    async delete(req,res,next) {
        try {
            const { languageId, productId } = req.query;
            const translate = productId > 0 ? await Product_translate.findAll({where:{productId, languageId}}) : null;
            return translate === null || translate.length === 0 ? next(ApiError.badRequest("TRANSLATE NOT EXISTS")) : res.json(translate[0].destroy());
        } catch (e) {
            return next(ApiError.badRequest("ID UNDEFINED OR NULL"));            
        }
    }
         
    async get(req, res, next) {
        try {   
            const { languageId, productId } = req.query;
            const translate = !productId && !languageId ? await Product_translate.findAll({where:{productId, languageId}}) : await Product_translate.findAll({where:{productId}});
            return translate === null || translate.length === 0 ? next(ApiError.badRequest("TRANSLATE NOT EXISTS")) : res.json(translate);
        } catch (e) {
            return next(ApiError.badRequest("ID UNDEFINED OR NULL")); 
        }
    }
}


export default new ProductTraslateController();