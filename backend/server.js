import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import constructorRoutes from './routes/constructorRoutes.js';
import obraPublicaRoutes from './routes/obraPublicaRoutes.js';
import presupuestoRoutes from './routes/presupuestoRoutes.js';
import fechaInicioRoutes from './routes/fechaInicioRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));


// Configurar rutas

app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend!');
});

app.use('/api/constructores', constructorRoutes);
app.use('/api/obras-publicas', obraPublicaRoutes);
app.use('/api/presupuestos', presupuestoRoutes);
app.use('/api/fechas-inicio', fechaInicioRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
