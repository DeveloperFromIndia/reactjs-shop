import { Router } from "express";
import StatusController from "../../controllers/Status/statusController.js";

const router = new Router();


router.post('/', StatusController.add);
router.delete('/', StatusController.delete);
router.get('/', StatusController.get);


export default router;