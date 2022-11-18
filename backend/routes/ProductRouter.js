import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router = new Router();


router.post('/create', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.get);


export default router;