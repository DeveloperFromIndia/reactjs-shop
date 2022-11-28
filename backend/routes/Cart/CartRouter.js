import { Router } from "express";
import CartController from "../../controllers/Cart/CartController.js";

const router = new Router();



router.post('/', CartController.add);
router.delete('/', CartController.delete);
router.get('/', CartController.get);


export default router;