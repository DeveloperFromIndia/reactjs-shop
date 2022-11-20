import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";

const router = new Router();


router.post('/create', CategoryController.create);
router.get('/getAll',CategoryController.getAll);
router.get('/:id',CategoryController.get);


export default router;