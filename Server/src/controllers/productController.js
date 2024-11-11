const { Product } = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
    const { name, brand, description, price } = req.body;
    const image = req.file;

    try {
        let imageUrl = null;
        let publicId = null;

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image.path, {
                upload_preset: "dgTiendaShop",
            });
            imageUrl = uploadedResponse.secure_url;
            publicId = uploadedResponse.public_id;
        }

        const product = await Product.create({
            name,
            brand,
            description,
            price,
            image: imageUrl,
            image_id: publicId
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send({ message: "Error al crear el producto", error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id); // podrias ser findByPk
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.image_id) {
            // Eliminar la imagen en Cloudinary usando `public_id`
            await cloudinary.uploader.destroy(product.image_id);
        }

        await product.destroy(); // Elimina el producto de la base de datos
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};

const getAllProducts = async (req, res) => {
    const { brand } = req.query;
    try {
        const products = await Product.findAll({
            where: brand ? { brand } : {},
        });
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al recuperar los productos", error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send("Producto no encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al recuperar el producto", error });
    }
};

const updateProduct = async (req, res) => {
    const { name, brand, description, price, productImg } = req.body;
    const productId = req.params.id;

        try {
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    
        // Manejo de imagen (si se proporciona una nueva imagen)
        let imageUrl = product.image?.url; // Usamos el .url de la imagen actual
    
        let publicId = product.image_id;
    
        if (productImg) {
                // Eliminar la imagen antigua de Cloudinary si existe
                if (product.image_id) {
                await cloudinary.uploader.destroy(product.image_id);
            }
    
                // Subir la nueva imagen
                const uploadedResponse = await cloudinary.uploader.upload(productImg, {
                upload_preset: "dgTiendaShop",
            });
            imageUrl = uploadedResponse.secure_url; // Guarda la URL de la imagen subida
    
            publicId = uploadedResponse.public_id;
        }
    
        // Asegúrate de que el formato de la imagen sea un objeto con la propiedad `url`
        const image = { url: imageUrl };
    
        // Actualizar el producto en la base de datos
        await product.update({
            name,
            brand,
            description,
            price,
            image: image,
            image_id: publicId,
        });
    
        res.status(200).json({ message: "Producto actualizado con éxito", product });
        } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
};