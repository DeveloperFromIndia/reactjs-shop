import { Router } from "express";
import CategoryKeywordController from "../../controllers/Category/CategoryKeywordController.js";


const router = new Router();


router.post('/', CategoryKeywordController.add);
router.delete('/', CategoryKeywordController.delete);
router.get('/',CategoryKeywordController.get);


export default router;