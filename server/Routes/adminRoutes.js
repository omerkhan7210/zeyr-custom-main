
import express from 'express';
import { AdminLogin,AdminRegister } from '../Controllers/adminController.js';

const router = express.Router();

router.post('/admin/register',AdminRegister);
router.post('/admin/login',AdminLogin);

export default router;