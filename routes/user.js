import express from 'express';
const router = express.Router();
import {get_user, get_user_by_id, delete_user, update_user,} from '../controllers/user-controller.js';
import {register, login} from '../controllers/auth-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';



router.post('/register',register);

router.post('/login', login);

router.get("/user/details", authenticate, get_user)
router.get("/user/:id", authenticate, get_user_by_id)
router.delete("/user/:id", authenticate, authorize('admin'), delete_user)
router.patch("/user/:id", authenticate, authorize('admin'), update_user)

export default router;