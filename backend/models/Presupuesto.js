import mongoose from 'mongoose';

const presupuestoSchema = new mongoose.Schema({
  monto: { type: Number, required: true },
  descripcion: { type: String, required: true },
  fechaAprobacion: { type: Date, required: true },
  constructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Constructor', required: true }
});

export default mongoose.model('Presupuesto', presupuestoSchema);
