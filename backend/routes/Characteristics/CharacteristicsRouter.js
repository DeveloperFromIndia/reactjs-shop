import { Router } from "express";
import CharacteristicsRouter from "../../controllers/Characteristics/characteristicsController.js";
const router = new Router();


router.post('/', CharacteristicsRouter.add);
router.get('/', CharacteristicsRouter.get);
router.delete('/', CharacteristicsRouter.delete);


export default router;