import { Router } from "express";
import CategoryTranslateController from "../../controllers/Category/CategoryTranslateController.js";


const router = new Router();


router.post('/', CategoryTranslateController.add);
router.delete('/', CategoryTranslateController.delete);
router.get('/',CategoryTranslateController.get);


export default router;