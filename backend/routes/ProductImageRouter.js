import { Router } from "express";
import ProductImageController from "../controllers/productImageController.js";

const router = new Router();


router.post('/add', ProductImageController.add);
router.delete('/delete', ProductImageController.delete);
router.get('/:id', ProductImageController.read);


export default router;