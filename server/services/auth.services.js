import { createUser, findUserByEmail } from "./user.services.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler( async(req) => {
    let newUser = await createUser(req);
    if(!newUser){
        let err = new Error("User not created");
        err.statusCode = 400;
        throw err;
    }
    return newUser;
})

export const loginUser = asyncHandler(async(req) => {
    let existingUser = await findUserByEmail(req);
    if(!existingUser){
        let err = new Error("User not found");
        err.statusCode = 404;
        throw err;
    }
    return existingUser;
})