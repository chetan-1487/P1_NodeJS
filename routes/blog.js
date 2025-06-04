import express from 'express';
const router = express.Router();
import {get_blogs, create_blog, delete_blog, update_blog,} from '../controllers/blog-controller.js';
import { authenticate, authorize } from '../middlewares/auth-middleware.js';


router.get("/blogs", authenticate, get_blogs)
router.post("/blog", authenticate, create_blog)
router.delete("/blog/:id", authenticate, authorize('admin'), delete_blog)
router.patch("/blog/:id", authenticate, authorize('admin'), update_blog)

export default  router ;
