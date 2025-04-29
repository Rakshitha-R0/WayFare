import express from 'express';
import { login, register } from '../controllers/auth.controllers.js';
import validate from '../middleware/validation.js';
import { loginSchema, registerSchema } from '../validations/auth.validations.js';

const router =express.Router();


router.post("/register",validate(registerSchema),register)
router.post("/login",validate(loginSchema),login)


export default router;