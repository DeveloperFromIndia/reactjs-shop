import { Router } from "express";

import product from "./ProductRouter.js";
import user from "./UserRouter.js";
import brand from "./BrandRouter.js";
import category from "./CategoryRouter.js";
import language  from "./LanguageRouter.js";
import currencies from "./CurrenciesRouter.js";


const router = new Router();

router.use('/language', language)
router.use('/product', product);
router.use('/brand', brand);
router.use('/category', category);
router.use('/user', user);
router.use('/currencies', currencies);



export default router;