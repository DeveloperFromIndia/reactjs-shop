import { Router } from "express";
import СurrenciesController from "../../controllers/Currencies/currenciesController.js";
const router = new Router();


router.post('/', СurrenciesController.add);
router.get('/', СurrenciesController.get);
router.delete('/', СurrenciesController.delete);


export default router;