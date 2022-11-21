import { Router } from "express";
import ProductCharacteristicsController from "../../controllers/Product/ProductCharacteristicsController.js";


const router = new Router();


router.post('/', ProductCharacteristicsController.add);
router.get('/', ProductCharacteristicsController.get);
router.delete('/', ProductCharacteristicsController.delete);


export default router;