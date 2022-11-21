import { Router } from "express";
import ReviewController from "../../controllers/Review/ReviewController.js";

const router = new Router();


router.post('/', ReviewController.add);
router.delete('/', ReviewController.delete);
router.get('/', ReviewController.get);


export default router;