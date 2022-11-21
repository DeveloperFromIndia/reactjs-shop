import { Router } from "express";
import OrdersController from "../../controllers/Orders/ordersController.js";


const router = new Router();


router.post('/', OrdersController.add);
router.delete('/', OrdersController.delete);
router.get('/', OrdersController.get);


export default router;