import { Router } from "express";
import BrandController from "../controllers/brandController.js";

const router = new Router();


router.post('/create', BrandController.create);
router.get('/', BrandController.getAll);


export default router;