import { Router } from "express";
import CategoryCharacteristicsController from "../../controllers/Category/categoryCharacteristicsController.js";


const router = new Router();


router.post('/', CategoryCharacteristicsController.add);
router.delete('/', CategoryCharacteristicsController.delete);
router.get('/',CategoryCharacteristicsController.get);


export default router;