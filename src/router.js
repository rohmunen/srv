import { Router } from "express";
import userController from "./controllers/user-controller.js";

const router = Router()

router.post('/signin', userController.signin)
router.post('/login', userController.login)

export default router