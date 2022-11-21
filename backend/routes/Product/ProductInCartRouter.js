import { Router } from "express";
import ProductInCartController from "../../controllers/Product/ProductInCartController.js";


const router = new Router();


router.post('/', ProductInCartController.add);
router.get('/', ProductInCartController.get);
router.delete('/', ProductInCartController.delete);


export default router;