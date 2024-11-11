const express = require('express');
const sequelize = require('./src/config/db'); // Importamos la configuración de la base de datos
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');
const path = require('path');

// Verificar si la carpeta existe, y si no, crearla
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const registerRoutes = require('./src/Routes/register.Routes'); 
const loginRoutes = require('./src/Routes/login.Routes');
const authRoutes = require('./src/Routes/auth.Routes');
const productRoutes = require('./src/Routes/product.Routes');
const OrderRoutes = require('./src/Routes/order.Routes');
const stripeRoutes = require("./src/Routes/stripe.Routes");
const userRoutes = require("./src/Routes/user.Routes");

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: "10mb" })); // Ajusta el límite según el tamaño de tus imágenes

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('DG Tienda-Online API');
});
app.get("/products", (req, res) => {
  res.send(products);
});

// Rutas
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stripe", stripeRoutes);
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);

// Sincroniza la base de datos y los modelos
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Esto no reiniciará la base de datos true o false (solo durante el desarrollo)
    console.log('Modelos sincronizados');
  } catch (error) {
    console.error('Error al conectar o sincronizar la base de datos:', error);
  }
};

syncModels();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



