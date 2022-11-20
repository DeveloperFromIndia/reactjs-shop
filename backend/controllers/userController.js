import ApiError from "../Error/ApiError.js";

class UserController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('VALUE UNDEFINED OR NULL'));
        } 
        res.json(id);
    }
}

export default new UserController();