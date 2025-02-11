import mongoose from 'mongoose';

const obraPublicaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  codigo: { type: Number, required: true },
  constructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Constructor', required: true }
});

export default mongoose.model('ObraPublica', obraPublicaSchema);
