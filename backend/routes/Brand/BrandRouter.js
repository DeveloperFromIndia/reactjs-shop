import { Router } from "express";
import BrandController from "../../controllers/Brand/brandController.js";

const router = new Router();


router.post('/', BrandController.create);
router.get('/', BrandController.get);
router.get('/', BrandController.delete);


export default router;