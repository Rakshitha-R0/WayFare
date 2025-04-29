import User from '../model/user.model.js'
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req) =>{
    const newUser = await User.create(req.body);
    if(!newUser){
        let err = new Error("User not created");
        err.statusCode = 400;
        throw err;
    }
    return newUser;
})

export const findUserByID = asyncHandler( async (id) => {
    let existingUser = await User.findById(id);
    if(!existingUser){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    return existingUser;
})

export const findUserByEmail = asyncHandler(async (req) => {
    let {email} = req.body;
    if(!email){
        let err = new Error("Email not provided");
        err.statusCode = 400;
        throw err;
    }
    let existingUser = await User.findOne({email});
    if(!existingUser){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    return existingUser;
})

export const findAllUsers = asyncHandler(async () => {
    let allUsers = await User.find();
    if(!allUsers){
        let err = new Error("No users found");
        err.statusCode = 404;
        throw err;
    }
    return allUsers;
})