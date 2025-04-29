import express from 'express';
import { getUsers } from '../controllers/user.controllers.js';
import auth from '../middleware/auth.js';

const router=express.Router();


router.get("/",auth,getUsers)


export default router;