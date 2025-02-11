import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FechaInicioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fechaInicio, setFechaInicio] = useState({ fechaInicio: '', responsable: '', comentarios: '', obraPublica: '' });
  const [obrasPublicas, setObrasPublicas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/obras-publicas')
      .then(res => setObrasPublicas(res.data))
      .catch(err => console.error(err));

    if (id) {
      axios.get(`http://localhost:5000/api/fechas-inicio/${id}`)
        .then(res => setFechaInicio(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFechaInicio({ ...fechaInicio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/fechas-inicio/${id}`, fechaInicio);
      } else {
        await axios.post('http://localhost:5000/api/fechas-inicio', fechaInicio);
      }
      navigate('/fechas');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nuevo'} Fecha de Inicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Fecha de Inicio</label>
          <input type="date" className="form-control" name="fechaInicio" value={fechaInicio.fechaInicio} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Responsable</label>
          <input type="text" className="form-control" name="responsable" value={fechaInicio.responsable} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Comentarios</label>
          <textarea className="form-control" name="comentarios" value={fechaInicio.comentarios} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Obra Pública</label>
          <select className="form-select" name="obraPublica" value={fechaInicio.obraPublica} onChange={handleChange} required>
            <option value="">Seleccione una obra pública</option>
            {obrasPublicas.map(obra => (
              <option key={obra._id} value={obra._id}>{obra.nombre}</option>
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

export default FechaInicioForm;
