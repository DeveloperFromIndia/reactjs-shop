import { Router } from "express";
import LanguageController from "../../controllers/Language/languageController.js";


const router = new Router();


router.post('/', LanguageController.add);
router.delete('/', LanguageController.delete);
router.get('/', LanguageController.get);


export default router;