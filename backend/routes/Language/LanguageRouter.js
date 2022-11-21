import { Router } from "express";
import LanguageController from "../../controllers/Language/languageController.js";

const router = new Router();


router.post('/create', LanguageController.create);
router.get('/getAll', LanguageController.getAll);
router.get('/:id', LanguageController.get);


export default router;