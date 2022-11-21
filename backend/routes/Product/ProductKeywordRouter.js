import { Router } from "express";
import ProductKeywordController from "../../controllers/Product/ProductKeywordController.js";


const router = new Router();


router.post('/', ProductKeywordController.add);
router.get('/', ProductKeywordController.get);
router.delete('/', ProductKeywordController.delete);


export default router;