import mongoose from 'mongoose';

const fechaInicioSchema = new mongoose.Schema({
  fechaInicio: { type: Date, required: true },
  responsable: { type: String, required: true },
  comentarios: { type: String },
  obraPublica: { type: mongoose.Schema.Types.ObjectId, ref: 'ObraPublica', required: true }
});

export default mongoose.model('FechaInicio', fechaInicioSchema);
