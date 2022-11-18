import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";

const router = new Router();


router.post('/craete',CategoryController.create);
router.get('/',CategoryController.getAll);


export default router;