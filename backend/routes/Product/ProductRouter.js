import { Router } from "express";
import ProductController from "../../controllers/Product/productController.js";
import product_img from "./ProductImageRouter.js";

const router = new Router();

router.use('/img', product_img);

router.post('/create', ProductController.create);
router.get('/getAll', ProductController.getAll);
router.get('/:id', ProductController.get);


export default router;