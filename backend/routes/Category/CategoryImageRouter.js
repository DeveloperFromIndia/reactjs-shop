import { Router } from "express";
import CategoryImageController from "../../controllers/Category/categoryImageController.js";


const router = new Router();


router.post('/', CategoryImageController.add);
router.delete('/', CategoryImageController.delete);
router.get('/',CategoryImageController.get);


export default router;