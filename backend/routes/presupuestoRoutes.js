import express from 'express';
import Presupuesto from '../models/Presupuesto.js';

const router = express.Router();

// Obtener todos los presupuestos
router.get('/', async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find().populate('constructor');
    res.json(presupuestos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo presupuesto
router.post('/', async (req, res) => {
  try {
    const nuevoPresupuesto = new Presupuesto(req.body);
    const savedPresupuesto = await nuevoPresupuesto.save();
    res.status(201).json(savedPresupuesto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener un presupuesto por ID
router.get('/:id', async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findById(req.params.id).populate('constructor');
    if (!presupuesto) return res.status(404).json({ message: 'Presupuesto no encontrado' });
    res.json(presupuesto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un presupuesto
router.put('/:id', async (req, res) => {
  try {
    const updatedPresupuesto = await Presupuesto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPresupuesto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un presupuesto
router.delete('/:id', async (req, res) => {
  try {
    await Presupuesto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Presupuesto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
