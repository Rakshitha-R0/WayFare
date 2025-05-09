import express from 'express';
import { getUsers, updateTheUser } from '../controllers/user.controllers.js';
import auth from '../middleware/auth.js';
import upload  from '../middleware/fileUpload.js';

const router=express.Router();


router.get("/",auth,getUsers)
router.put('/:id',auth, upload ,updateTheUser)


export default router;