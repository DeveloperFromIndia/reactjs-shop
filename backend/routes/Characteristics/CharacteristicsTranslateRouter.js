import { Router } from "express";
import CharacteristicsTranslateController from "../../controllers/Characteristics/characteristicsTranslateController.js";


const router = new Router();


router.post('/', CharacteristicsTranslateController.add);
router.get('/', CharacteristicsTranslateController.get);
router.delete('/', CharacteristicsTranslateController.delete);


export default router;