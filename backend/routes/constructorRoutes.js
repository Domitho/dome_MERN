import express from 'express';
import Constructor from '../models/Constructor.js';

const router = express.Router();

// Obtener todos los constructores
router.get('/', async (req, res) => {
  try {
    const constructores = await Constructor.find();
    res.json(constructores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo constructor
router.post('/', async (req, res) => {
  try {
    const nuevoConstructor = new Constructor(req.body);
    const savedConstructor = await nuevoConstructor.save();
    res.status(201).json(savedConstructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener un constructor por ID
router.get('/:id', async (req, res) => {
  try {
    const constructor = await Constructor.findById(req.params.id);
    if (!constructor) return res.status(404).json({ message: 'Constructor no encontrado' });
    res.json(constructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un constructor
router.put('/:id', async (req, res) => {
  try {
    const updatedConstructor = await Constructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedConstructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un constructor
router.delete('/:id', async (req, res) => {
  try {
    await Constructor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Constructor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
