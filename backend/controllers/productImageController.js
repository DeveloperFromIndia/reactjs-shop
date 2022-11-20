import ApiError from "../Error/ApiError.js";
import { Product_img } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../utils/cloudinary.js";
import { unlink } from 'fs';

class ProductImageController {
    async add(req, res, next) {
        try {
            const { productId } = req.query;

            if (req.files !== undefined && productId > 0) {
                const { img } = req.files;
                let result = [];
                const product_img = await Product_img.findAll({where:{ productId }});
                
                let last_index = null;
                if(product_img.length > 0) {
                    last_index = product_img.at(-1).dataValues.index + 1;
                } else {
                    last_index = 1; 
                }
                if (Array.isArray(img)) {
                    for(let i = 0; i < img.length; i++, last_index++) {
                        const file_name = uuidv4();
                        const file_upload = await cloudinary.uploader.upload(img[i].tempFilePath, {
                            public_id: file_name,
                            resource_type: "auto",
                            folder: process.env.CLOUD_PRODUCT_FOLDER
                        });
                        const { url } = file_upload; 
                        
                        const product_img = await Product_img.create({url, file_name, index: last_index, productId});
                        result.push(product_img);
                    }

                    img.forEach(e => {
                        unlink(e.tempFilePath, (err) => {
                            console.error(err);
                        });
                    });
                } else {
                    const file_name = uuidv4();
                    const file_upload = await cloudinary.uploader.upload(img.tempFilePath, {
                        public_id: file_name,
                        resource_type: "auto",
                        folder: process.env.CLOUD_PRODUCT_FOLDER
                    });

                    const { url } = file_upload; 
                    
                    const product_img = await Product_img.create({url, file_name, index: last_index, productId});
                    result.push(product_img);
                    
                    unlink(img.tempFilePath, (err) => {
                        console.error(err);
                    });
                }
                
                return res.json(result);
            } else {
                next(ApiError.badRequest("FILE UNDEFINED OR WRONG ID"));
            }
        } catch (e) {
            next(ApiError.badRequest("SOMETHING WENT WRONG"));
        }
    }
    async delete(req, res) {

    }
    async read(req, res) {

    }
}

export default new ProductImageController();