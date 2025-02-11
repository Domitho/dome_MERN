import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const FechasInicioList = () => {
  const [fechasInicio, setFechasInicio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/fechas-inicio')
      .then(res => {
        setFechasInicio(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta fecha de inicio?')) {
      try {
        await axios.delete(`http://localhost:5000/api/fechas-inicio/${id}`);
        setFechasInicio(fechasInicio.filter(fecha => fecha._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { name: "Fecha de Inicio", selector: row => new Date(row.fechaInicio).toLocaleDateString(), sortable: true },
    { name: "Responsable", selector: row => row.responsable, sortable: true },
    { name: "Comentarios", selector: row => row.comentarios || 'Sin comentarios', sortable: true },
    { name: "Obra Pública", selector: row => row.obraPublica?.nombre, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Link to={`/fechas/editar/${row._id}`} className="btn btn-warning me-2">
            <i className="bi bi-pencil-square"></i> 
          </Link>
          <button onClick={() => handleDelete(row._id)} className="btn btn-danger">
            <i className="bi bi-trash"></i> 
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredFechas = fechasInicio.filter(fecha => 
    fecha.responsable.toLowerCase().includes(search.toLowerCase()) ||
    fecha.comentarios?.toLowerCase().includes(search.toLowerCase()) ||
    fecha.obraPublica?.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand" to="/">Inicio de Obras</Link>
        </div>
      </nav>

      <div className="container mt-4 p-4 shadow rounded bg-light">
        <h2 className="text-center mb-4">Lista de Fechas de Inicio</h2>
        <div className="d-flex justify-content-between mb-3">
          <Link to="/fechas/nuevo" className="btn btn-success">
            <i className="bi bi-plus-lg"></i> Nueva Fecha de Inicio
          </Link>
          <input 
            type="text" 
            className="form-control w-50" 
            placeholder="Buscar fechas de inicio..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <DataTable
            title="Fechas de Inicio"
            columns={columns}
            data={filteredFechas}
            pagination
            highlightOnHover
            striped
            className="shadow-sm rounded"
          />
        )}
      </div>
    </>
  );
};

export default FechasInicioList;
