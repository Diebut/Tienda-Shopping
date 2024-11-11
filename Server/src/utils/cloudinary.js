const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

module.exports = cloudinary;

/* const cloudinaryModule = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require('dotenv').config();

cloudinaryModule.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configuración del almacenamiento de Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinaryModule,
    params: {
        folder: "DG-Tienda-Shop", // Carpeta donde se guardarán las imágenes
        allowed_formats: ["jpg", "png", "jpeg", "AVIF"], // Tipos de imagen permitidos
    },
});

const upload = multer({ storage });

module.exports = { cloudinary: cloudinaryModule, upload }; */