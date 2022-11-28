import { Router } from "express";
import translate from "./CharacteristicsTranslateRouter.js";
import CharacteristicsController from "../../controllers/Characteristics/characteristicsController.js";
const router = new Router();

router.use("/translate", translate);

router.post('/', CharacteristicsController.add);
router.get('/', CharacteristicsController.get);
router.delete('/', CharacteristicsController.delete);


export default router;