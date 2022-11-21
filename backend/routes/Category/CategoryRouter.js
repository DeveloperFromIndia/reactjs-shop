import { Router } from "express";
import CategoryController from "../../controllers/Category/categoryController.js";

import CategoryCharacteristics from "./CategoryCharacteristicsRouter.js";
import CategoryTranslate from "./CategoryTranslateRouter.js";
import CategoryKeyword from "./CategoryKeywordRouter.js";


const router = new Router();


router.use('/characteristics', CategoryCharacteristics);
router.use('/translate', CategoryTranslate);
router.use('/keyword', CategoryKeyword);

router.post('/', CategoryController.create);
router.get('/',CategoryController.get);
router.delete('/',CategoryController.delete);


export default router;