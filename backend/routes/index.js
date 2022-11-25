import { Router } from "express";

import user from "./User/UserRouter.js";
import brand from "./Brand/BrandRouter.js";
import product from "./Product/ProductRouter.js";
import category from "./Category/CategoryRouter.js";
import language  from "./Language/LanguageRouter.js";
import currencies from "./Currencies/CurrenciesRouter.js";
import status from "./Status/StatusRouter.js";
import characteristics from "./Characteristics/CharacteristicsRouter.js";

const router = new Router();

router.use('/characteristics', characteristics);
router.use('/status',status);
router.use('/language', language)
router.use('/product', product);
router.use('/brand', brand);
router.use('/category', category);
router.use('/user', user);
router.use('/currencies', currencies);



export default router;