import ApiError from "../../Error/ApiError.js";
import { Product, Product_img } from "../../models/models.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../../utils/cloudinary.js";
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
    async  add (req, res, next) {
        try {
            if (req.files !== undefined) {
                const { img } = req.files;
                const { productId } = req.query;
                if (productId > 0) {
                    const product = await Product.findByPk(productId); 
                    if (product === null) {
                        deleteTmpImg(img);
                        next(ApiError.badRequest("PRODUCT NOT EXISTS"));
                    } else {
                        const product_imgs = await Product_img.findAll({where:{ productId }});
                        const last_index = product_imgs.at(-1).dataValues.index + 1;
                        let result = [];
                        if(Array.isArray(img)) {
                            for (let i = 0, imgIndex = last_index; i < img.length; i++, imgIndex++) {
                                const file_name = uuidv4();
                                const file_upload = await cloudinary.uploader.upload(img[i].tempFilePath, {
                                    public_id: file_name,
                                    resource_type: "auto",
                                    folder: process.env.CLOUD_PRODUCT_FOLDER
                                }); 
                                deleteTmpImg(img[i]);
                                const { url, public_id } = file_upload; 
                                const imageToDB = await Product_img.create({url, public_id, index: last_index, productId}); 
                                result.push(imageToDB);
                            }
                        } else {
                            const file_name = uuidv4();
                            const file_upload = await cloudinary.uploader.upload(img.tempFilePath, {
                                public_id: file_name,
                                resource_type: "auto",
                                folder: process.env.CLOUD_PRODUCT_FOLDER
                            }); 
                            deleteTmpImg(img);
                            const { url, public_id } = file_upload; 
                            const imageToDB = await Product_img.create({url, public_id, index: last_index, productId}); 
                            result.push(imageToDB);
                        }
                        return res.json(result);
                    }
                } else {
                    return next(ApiError.forbidden("PRODUCT ID IS MISSING"));
                }
            } else {
                return next(ApiError.badRequest("FILES NOT ESISTS"));
            }
        } catch (e) {
            return next(ApiError.forbidden("SOMETHINK WENT WRONG"));
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
    async read(req, res, next) {
        try {
            const { id, productId } = req.query;
            if (productId > 0) {
                const imgs = await Product_img.findAll({where:{productId: productId }});
                return res.json(imgs);
            } else if (id > 0) {
                const img = await Product_img.findByPk(id);
                return res.json(img);
            } else {
                next(ApiError.badRequest("ID UNDEFINED OR NULL"));            
            }
        } catch (e) {
            next(ApiError.badRequest("ID UNDEFINED OR NULL"));            
        }
    }
}

export default new ProductImageController();