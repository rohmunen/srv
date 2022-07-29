import { Router } from "express";
import tagsController from "./controllers/tags-controller.js";
import userController from "./controllers/user-controller.js";
import usertagController from "./controllers/usertag-controller.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";

const router = Router()

router.post('/signin', userController.signin)
router.post('/login', userController.login)
router.put('/user', authMiddleware, userController.update)
router.get('/refresh', authMiddleware, userController.refresh)
router.get('/tag/:id', authMiddleware, tagsController.getTagById)
router.get('/tag', authMiddleware, tagsController.getTags)
router.post('/tag', authMiddleware, tagsController.create)
router.put('/tag/:id', authMiddleware, tagsController.update)
router.delete('/tag/:id', authMiddleware, tagsController.delete)
router.get('/user/tag/my', authMiddleware, usertagController.get)
router.delete('/user/tag/:id', authMiddleware, usertagController.delete)
router.post('/user/tag', authMiddleware, usertagController.add)

export default router