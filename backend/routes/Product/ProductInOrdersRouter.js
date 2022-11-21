import { Router } from "express";
import ProductInOrdersController from "../../controllers/Product/ProductInOrdersController.js";


const router = new Router();


router.post('/', ProductInOrdersController.add);
router.get('/', ProductInOrdersController.get);
router.delete('/', ProductInOrdersController.delete);


export default router;