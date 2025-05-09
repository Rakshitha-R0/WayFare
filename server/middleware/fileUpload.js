import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "travel-app",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation:[{width:500,height:500,quality:"auto",crop:"scale"}],
    },
    size: 1024 * 1024 * 5, // 5MB
})

const upload = multer({storage: storage});

export default upload.single("userImage");