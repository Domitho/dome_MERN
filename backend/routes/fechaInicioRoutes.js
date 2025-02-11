import express from 'express';
import FechaInicio from '../models/FechaInicio.js';

const router = express.Router();

// Obtener todas las fechas de inicio
router.get('/', async (req, res) => {
  try {
    const fechas = await FechaInicio.find().populate('obraPublica');
    res.json(fechas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva fecha de inicio
router.post('/', async (req, res) => {
  try {
    const nuevaFecha = new FechaInicio(req.body);
    const savedFecha = await nuevaFecha.save();
    res.status(201).json(savedFecha);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener una fecha de inicio por ID
router.get('/:id', async (req, res) => {
  try {
    const fecha = await FechaInicio.findById(req.params.id).populate('obraPublica');
    if (!fecha) return res.status(404).json({ message: 'Fecha de inicio no encontrada' });
    res.json(fecha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una fecha de inicio
router.put('/:id', async (req, res) => {
  try {
    const updatedFecha = await FechaInicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFecha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una fecha de inicio
router.delete('/:id', async (req, res) => {
  try {
    await FechaInicio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fecha de inicio eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
