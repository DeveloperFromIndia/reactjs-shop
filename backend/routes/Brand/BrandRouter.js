import { Router } from "express";
import BrandController from "../../controllers/Brand/brandController.js";

const router = new Router();


router.post('/create', BrandController.create);
router.get('/getAll', BrandController.getAll);
router.get('/:id', BrandController.get);


export default router;