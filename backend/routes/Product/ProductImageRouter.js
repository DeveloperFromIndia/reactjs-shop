import { Router } from "express";
import ProductImageController from "../../controllers/Product/productImageController.js";

const router = new Router();


router.post('/', ProductImageController.add);
router.delete('/', ProductImageController.delete);
router.get('/', ProductImageController.get);


export default router;