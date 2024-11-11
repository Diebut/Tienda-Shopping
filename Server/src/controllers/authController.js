const {User} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateAuthToken = require('../utils/genAuthToken'); 

// Controlador para verificar el token y devolver información del usuario
const verifyToken = async (req, res) => {
    try {
        console.log("req.user:", req.user); 
        const user = await User.findByPk(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Solo devolver datos seguros
        res.json({ 
            id: user.id, 
            name: user.name, 
            email: user.email,
            isAdmin: user.isAdmin 
        });
    } catch (error) {
        console.error("Error fetching user info: ", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
    
        const token = generateAuthToken(user);
        if (!token) {
            throw new Error("Token no recibido");
        }
    
        // Enviar los datos del usuario junto con el token
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
        } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
        }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });

            if (user && await bcrypt.compare(password, user.password)) {

            const token = generateAuthToken(user);
        if (!token) {
            throw new Error("Token no recibido");
        }
        
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyToken
};