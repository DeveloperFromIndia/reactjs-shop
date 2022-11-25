import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import cloudinary from "../../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import { Category_img, Category } from "../../models/models.js";

import { deleteTempImg } from "../../utils/myFunction.js";


class СategoryImageController {
    async  add (req, res, next) {
        try {
            if (req.files !== undefined) {
                const { img } = req.files;
                const { categoryId } = req.query;
                console.log(categoryId);
                if (categoryId > 0) {
                    const category = await Category.findByPk(categoryId); 
                    if (category === null) {    
                        deleteTempImg(img);
                        next(ApiError.badRequest("PRODUCT NOT EXISTS"));
                    } else {
                        const category_imgs = await Category_img.findAll({where:{ categoryId }});
                        const last_index = !category_imgs ? category_imgs.at(-1).dataValues.index + 1 : 1;
                        let result = [];
                        if(Array.isArray(img)) {
                            for (let i = 0, imgIndex = last_index; i < img.length; i++, imgIndex++) {
                                const file_name = uuidv4();
                                const file_upload = await cloudinary.uploader.upload(img[i].tempFilePath, {
                                    public_id: file_name,
                                    resource_type: "auto",
                                    folder: process.env.CLOUD_CATEGORY_FOLDER
                                }); 
                                deleteTempImg(img[i]);
                                const { url, public_id } = file_upload; 
                                const imageToDB = await Category_img.create({url, public_id, index: last_index, categoryId}); 
                                result.push(imageToDB);
                            }
                        } else {
                            const file_name = uuidv4();
                            const file_upload = await cloudinary.uploader.upload(img.tempFilePath, {
                                public_id: file_name,
                                resource_type: "auto",
                                folder: process.env.CLOUD_CATEGORY_FOLDER
                            }); 
                            deleteTempImg(img);
                            const { url, public_id } = file_upload; 
                            const imageToDB = await Category_img.create({url, public_id, index: last_index, categoryId}); 
                            result.push(imageToDB);
                        }
                        return res.json(result);
                    }
                } else {
                    return next(ApiError.forbidden("CATEOGRY ID IS MISSING"));
                }
            } else {
                return next(ApiError.badRequest("FILES NOT ESISTS"));
            }
        } catch (e) {
            return next(ApiError.forbidden("SOMETHINK WENT WRONG"));
        }
    }
    async delete(req, res, next) {
        try {
            const { categoryImgId } = req.query;
            if (categoryImgId > 0) {
                const img = await Category_img.findByPk(categoryImgId);
                if(img === null) { 
                    return next(ApiError.badRequest("CATEGORY_IMG NOT FOUND")); 
                } else {
                    const result = await cloudinary.uploader.destroy(img.public_id, (result) => { console.log(result); });
                    await img.destroy();
                    return res.json(result);
                }
            }
            return next(ApiError.badRequest("ID UNDEFINED OR NULL"));
        } catch (e) {
            return next(ApiError.badRequest({error: e})); 
        }
    }
    async get(req, res, next) {
        try {
            const { id } = req.query;
            const img =  id > 0 ? await Category_img.findByPk(id) : await Category_img.findAll();
            return img === null ? next(ApiError.badRequest("ID UNDEFINED OR NULL")) : res.json(img);
        } catch (e) {
            return next(ApiError.badRequest({error: e})); 
        }
    }
}


export default new СategoryImageController();