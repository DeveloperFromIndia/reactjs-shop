import { Router } from "express";
import translate from "./StatusTranslateRouter.js";
import StatusController from "../../controllers/Status/statusController.js";

const router = new Router();


router.use('/translate', translate);

router.post('/', StatusController.add);
router.delete('/', StatusController.delete);
router.get('/', StatusController.get);


export default router;