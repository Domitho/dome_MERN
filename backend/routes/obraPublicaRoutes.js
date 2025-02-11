import express from 'express';
import ObraPublica from '../models/ObraPublica.js';

const router = express.Router();

// Obtener todas las obras públicas
router.get('/', async (req, res) => {
  try {
    const obras = await ObraPublica.find().populate('constructor');
    res.json(obras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva obra pública
router.post('/', async (req, res) => {
  try {
    const nuevaObra = new ObraPublica(req.body);
    const savedObra = await nuevaObra.save();
    res.status(201).json(savedObra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener una obra por ID
router.get('/:id', async (req, res) => {
  try {
    const obra = await ObraPublica.findById(req.params.id).populate('constructor');
    if (!obra) return res.status(404).json({ message: 'Obra pública no encontrada' });
    res.json(obra);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una obra pública
router.put('/:id', async (req, res) => {
  try {
    const updatedObra = await ObraPublica.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedObra);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una obra pública
router.delete('/:id', async (req, res) => {
  try {
    await ObraPublica.findByIdAndDelete(req.params.id);
    res.json({ message: 'Obra pública eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
