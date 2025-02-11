import mongoose from 'mongoose';

const constructorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  empresa: { type: String, required: true },
  contacto: { type: String, required: true }
});

export default mongoose.model('Constructor', constructorSchema);
