import { Router } from "express";
import Đ¡urrenciesController from "../../controllers/Currencies/currenciesController.js";
const router = new Router();


router.post('/', Đ¡urrenciesController.add);
router.get('/', Đ¡urrenciesController.get);
router.delete('/', Đ¡urrenciesController.delete);


export default router;