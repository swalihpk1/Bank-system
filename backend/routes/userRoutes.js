import express from 'express';
import { protect } from '../middlewares/userAuthMiddleware.js'
import {
    authUser,
    registerUser,
    deposteAmount,
    withdrawAmount,
    logoutUser,
} from '../controllers/userController.js';
const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.post('/deposite', protect, deposteAmount)
router.post('/withdraw', protect, withdrawAmount)

export default router