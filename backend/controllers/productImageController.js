import ApiError from "../Error/ApiError.js";
import { Product, Product_img } from "../models/models.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../utils/cloudinary.js";
import { unlink } from 'fs';



function deleteTmpImg(img) {
    if (img !== undefined || img !== null) {
        if (Array.isArray(img)) {
            img.forEach(e => {
                unlink(e.tempFilePath, (err) => {
                    if (err !== null) { console.error(err); }
                });
            });
        } else {
            unlink(img.tempFilePath, (err) => {
                if (err !== null) { console.error(err); }
            });
            return true;
        } 
    } else {
        return false;
    }
}

class ProductImageController {
    async add(req, res, next) {
        try {
            const { productId } = req.query;

            if (req.files !== undefined && productId > 0) {
                const { img } = req.files;
                let result = [];
                const product_img = await Product_img.findAll({where:{ productId }});
                
                const product = await Product.findByPk(productId);
                if(product === null) {
                    deleteTmpImg(img);
                    return next(ApiError.badRequest("PRODUCT NOT EXISTS"))
                }
                
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
                        const { url, public_id } = file_upload; 
                        
                        const product_img = await Product_img.create({url, public_id, last_index, productId}); 
                        result.push(product_img);
                    }
                } else {
                    const file_name = uuidv4();
                    const file_upload = await cloudinary.uploader.upload(img.tempFilePath, {
                        public_id: file_name,
                        resource_type: "auto",
                        folder: process.env.CLOUD_PRODUCT_FOLDER
                    });
                    const { url, public_id } = file_upload; 
                    
                    const product_img = await Product_img.create({url, public_id, index: last_index, productId}); 
                    result.push(product_img);
                }

                deleteTmpImg(img);
                return res.json(result);
            } else {
                next(ApiError.badRequest("FILE UNDEFINED OR WRONG ID"));
            }
        } catch (e) {
            next(ApiError.badRequest("SOMETHING WENT WRONG"));
        }
    }
    async delete(req, res, next) {
        const { id } = req.query;
        if (id > 0) {
            const img = await Product_img.findByPk(id);
            if(img === null) {
                return next(ApiError.badRequest("PRODUCT_IMG NOT FOUND"));
            }
            const result = await cloudinary.uploader.destroy(img.public_id, (result) => {
                console.log(result);
            });
            await img.destroy();

            return res.json(result);
        } 
        return next(ApiError.badRequest("ID UNDEFINED OR NULL"));
    }
    async read(req, res) {

    }
}

export default new ProductImageController();