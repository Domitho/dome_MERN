import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ObraPublicaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [obra, setObra] = useState({ nombre: '', ubicacion: '', codigo: '', constructor: '' });
  const [constructores, setConstructores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/constructores')
      .then(res => setConstructores(res.data))
      .catch(err => console.error(err));

    if (id) {
      axios.get(`http://localhost:5000/api/obras-publicas/${id}`)
        .then(res => setObra(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setObra({ ...obra, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/obras-publicas/${id}`, obra);
      } else {
        await axios.post('http://localhost:5000/api/obras-publicas', obra);
      }
      navigate('/obraspublicas');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nueva'} Obra Pública</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" value={obra.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input type="text" className="form-control" name="ubicacion" value={obra.ubicacion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Codigo de obra</label>
          <input type="number" className="form-control" name="codigo" value={obra.codigo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Constructor</label>
          <select className="form-select" name="constructor" value={obra.constructor} onChange={handleChange} required>
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

export default ObraPublicaForm;
