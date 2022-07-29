import { Router } from "express";
import tagsController from "./controllers/tags-controller.js";
import userController from "./controllers/user-controller.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";

const router = Router()

router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.get('/refresh', authMiddleware, userController.refresh)
router.get('/tag/:id', authMiddleware, tagsController.getTagById)
router.get('/tag', authMiddleware, tagsController.getTags)
router.post('/tag', authMiddleware, tagsController.create)

export default router