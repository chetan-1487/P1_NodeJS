import express from 'express';
const router = express.Router();
import {getUser, getUserById, deleteUser, updateUser,} from '../controllers/user-controller.js';
import {register, login} from '../controllers/auth-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';



router.post('/register',register);

router.post('/login', login);

router.get("/user/details", authenticate, getUser)
router.get("/user/:id", authenticate, getUserById)
router.delete("/user/:id", authenticate, authorize('admin'), deleteUser)
router.patch("/user/:id", authenticate, authorize('admin'), updateUser)

export default router;