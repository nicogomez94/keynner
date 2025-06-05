import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config/config';
import authRoutes from './routes/authRoutes';
import keyRoutes from './routes/keyRoutes';
import ownerRoutes from './routes/ownerRoutes';

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/owner', ownerRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (_req, res) => {
  res.send('KeyNest API está funcionando');
});

// Iniciar el servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

export default app;
