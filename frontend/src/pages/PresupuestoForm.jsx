import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PresupuestoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [presupuesto, setPresupuesto] = useState({ monto: '', descripcion: '', fechaAprobacion: '', constructor: '' });
  const [constructores, setConstructores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/constructores')
      .then(res => setConstructores(res.data))
      .catch(err => console.error(err));

    if (id) {
      axios.get(`http://localhost:5000/api/presupuestos/${id}`)
        .then(res => setPresupuesto(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setPresupuesto({ ...presupuesto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/presupuestos/${id}`, presupuesto);
      } else {
        await axios.post('http://localhost:5000/api/presupuestos', presupuesto);
      }
      navigate('/presupuestos');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nuevo'} Presupuesto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input type="number" className="form-control" name="monto" value={presupuesto.monto} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input type="text" className="form-control" name="descripcion" value={presupuesto.descripcion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Aprobación</label>
          <input type="date" className="form-control" name="fechaAprobacion" value={presupuesto.fechaAprobacion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Constructor</label>
          <select className="form-control" name="constructor" value={presupuesto.constructor} onChange={handleChange} required>
            <option value="">Seleccione un constructor</option>
            {constructores.map(constructor => (
              <option key={constructor._id} value={constructor._id}>{constructor.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default PresupuestoForm;
