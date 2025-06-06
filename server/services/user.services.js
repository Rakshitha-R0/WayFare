import User from '../model/user.model.js'
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req) =>{
    let userData = {};
    console.log("User data:", req.body);
    
    if (req.body.googleId) {
        // Google signup: only require email and googleId
        userData.email = req.body.email;
        userData.googleId = req.body.googleId;
        userData.username = req.body.username || req.body.email.split('@')[0];
    } else {
        userData.username = req.body.username;
        userData.email = req.body.email;
        userData.password = req.body.password;
        userData.confirmPassword = req.body.confirmPassword;
    }
    try {
        const newUser = await User.create(userData);
        if(!newUser){
            let err = new Error("User not created");
            err.statusCode = 400;
            throw err;
        }
        return newUser;
    } catch (err) {
        console.error('User creation error:', err);
        throw err;
    }
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

export const updateUser = asyncHandler(async (id, req) => {
    let updatedUser=await User.findByIdAndUpdate(id,{userImage:req.file.path},{new:true})
    if(!updatedUser){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    return updatedUser;
})
