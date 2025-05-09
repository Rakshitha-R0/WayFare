import asyncHandler from "express-async-handler";
import { findUserByID, findUserByEmail, findAllUsers, updateUser } from "../services/user.services.js";


export const getUsers=asyncHandler(async (req,res,next)=>{
    const users=await findAllUsers()
    if(!users){
        let err=new Error("Users not found")
        err.statusCode=404
        throw err;
    }
    res.status(200).json(users)
})

export const getUserById = asyncHandler (async(req, res, next) => {
    const user = await findUserByID(req.userID);
    if(!user){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(user);
})

export const getUserByEmail = asyncHandler(async(req, res, next) => {
    const existingUser = await findUserByEmail(req.userEmail);
    if(!existingUser){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(existingUser);
})

export const updateTheUser = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    let user = await updateUser(id, req);
    if(!user){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    res.status(200).json(user);
})
