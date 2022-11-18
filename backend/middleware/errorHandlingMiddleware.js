import ApiError from "../Error/ApiError.js";

export default (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({msg: err.msg})
    }
    return res.status(500).json({msg: "Untrack error!"})
}