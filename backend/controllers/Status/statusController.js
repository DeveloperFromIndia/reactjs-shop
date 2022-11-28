import {} from "dotenv";
import ApiError from "../../Error/ApiError.js";
import { Status } from "../../models/models.js";



class StatusController {
    async add(req,res,next) {
        try {
            const { status_id } = req.query;

            
        } catch (e) {

        }
    }
    async delete(req,res,next) {

    }
    async get(req,res,next) {
        try {
            const { statusId } = req.query;
            let status = statusId > 0 ? await Status.findByPk(statusId) : await Status.findAll();
            return status === null ? next(ApiError.badRequest("STATUS NOT EXISTS")) : res.json(status);
        } catch (e) {
            return next(ApiError.badRequest("VALUES NOT EXISTS"));
        }
    }
}


export default new StatusController();