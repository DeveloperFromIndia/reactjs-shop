import { Router } from "express";
import ProductController from "../../controllers/Product/productController.js";

import productImg from "./ProductImageRouter.js";
import productInCart from "./ProductInCartRouter.js";
import productInOrders from "./ProductInOrdersRouter.js";
import productKeyword from "./ProductKeywordRouter.js";
import productCharacteristics from "./ProductCharacteristicsRouter.js"; 
import productTranslate from "./ProductTranslateRouter.js";

const router = new Router();


router.use('/inCart', productInCart);
router.use('/translate', productTranslate);
router.use('/inOrder', productInOrders);
router.use('/keyword', productKeyword);
router.use('/characteristics', productCharacteristics);
router.use('/img', productImg);

router.post('/', ProductController.create);
router.get('/', ProductController.get);
router.delete('/', ProductController.delete);


export default router;