import express from 'express';
import { registerUser, getUsers,loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // Add User
router.get('/users', getUsers); // Get All Users
router.post('/login', loginUser); // Login User


export default router;

