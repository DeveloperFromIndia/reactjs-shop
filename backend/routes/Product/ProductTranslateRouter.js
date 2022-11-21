import { Router } from "express";
import ProductTranslateController from "../../controllers/Product/productTranslateController.js";


const router = new Router();


router.post('/', ProductTranslateController.add);
router.get('/', ProductTranslateController.get);
router.delete('/', ProductTranslateController.delete);


export default router;