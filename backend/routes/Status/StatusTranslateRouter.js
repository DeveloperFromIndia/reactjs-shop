import { Router } from "express";
import StatusTranslateController from "../../controllers/Status/statusTranslateController.js";

const router = new Router();


router.post('/', StatusTranslateController.add);
router.delete('/', StatusTranslateController.delete);
router.get('/', StatusTranslateController.get);


export default router;