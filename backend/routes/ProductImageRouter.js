import { Router } from "express";
import ProductImageController from "../controllers/productImageController.js";

const router = new Router();


router.post('/', ProductImageController.add);
router.delete('/', ProductImageController.delete);
router.get('/:id', ProductImageController.read);


export default router;