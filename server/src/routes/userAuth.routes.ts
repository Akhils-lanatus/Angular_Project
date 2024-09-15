import { Router } from 'express';
import {
  userLoginUserController,
  userRegisterController,
} from '../controllers/userAuth.controller.js';
const router = Router();

router.post('/register', userRegisterController);
router.post('/login', userLoginUserController);

export default router;
