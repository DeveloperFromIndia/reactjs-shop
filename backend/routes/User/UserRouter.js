import { Router } from "express";
import UserController from "../../controllers/User/userController.js";

const router = new Router();


router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', UserController.check);


export default router;