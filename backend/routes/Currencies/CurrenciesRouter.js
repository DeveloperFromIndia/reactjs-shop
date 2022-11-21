import { Router } from "express";
import СurrenciesController from "../../controllers/Currencies/currenciesController.js";
const router = new Router();


router.post('/create', СurrenciesController.create);
router.get('/getAll', СurrenciesController.getAll);
router.get('/:id', СurrenciesController.get);


export default router;