import { Router } from 'express';
import UserController from '../../controllers/userController';

const router = Router();

router.get('/allusers', UserController.getAllUsers);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/user/:userName', UserController.getUserByUserName);
router.get('/userid/:userName', UserController.getUserIdByUserName);

export default router;
