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
    // If the user is a Google user but googleId is not present in the login request, return an error
    if (existingUser.googleId && !req.body.googleId) {
        let err = new Error("Google ID required for Google login.");
        err.statusCode = 400;
        throw err;
    }
    // If the request is for Google login, but the user is not a Google user
    if (req.body.googleId && !existingUser.googleId) {
        let err = new Error("Google account not linked. Please sign up with Google first.");
        err.statusCode = 400;
        throw err;
    }
    return existingUser;
})
