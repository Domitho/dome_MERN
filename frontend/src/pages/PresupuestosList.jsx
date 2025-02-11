import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const PresupuestosList = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/presupuestos')
      .then(res => {
        setPresupuestos(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este presupuesto?')) {
      try {
        await axios.delete(`http://localhost:5000/api/presupuestos/${id}`);
        setPresupuestos(presupuestos.filter(presupuesto => presupuesto._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { name: "Monto", selector: row => `$${row.monto}`, sortable: true },
    { name: "Descripción", selector: row => row.descripcion, sortable: true },
    { name: "Fecha de Aprobación", selector: row => new Date(row.fechaAprobacion).toLocaleDateString(), sortable: true },
    { name: "Constructor", selector: row => row.constructor?.nombre, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Link to={`/presupuestos/editar/${row._id}`} className="btn btn-warning me-2">
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

  const filteredPresupuestos = presupuestos.filter(presupuesto => 
    presupuesto.descripcion.toLowerCase().includes(search.toLowerCase()) ||
    presupuesto.constructor?.nombre.toLowerCase().includes(search.toLowerCase()) ||
    String(presupuesto.monto).includes(search)
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container">
          <a className="navbar-brand" href="/">Presupuestos</a>
        </div>
      </nav>
      <div className="container mt-4 p-4 bg-light rounded shadow">
        <h2 className="text-center mb-4">Lista de Presupuestos</h2>
        <div className="d-flex justify-content-between mb-3">
          <Link to="/presupuestos/nuevo" className="btn btn-success">
            <i className="bi bi-plus-lg"></i> Nuevo Presupuesto
          </Link>
          <input 
            type="text" 
            className="form-control w-25" 
            placeholder="Buscar presupuestos..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white p-3 rounded shadow">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <DataTable
              title="Presupuestos"
              columns={columns}
              data={filteredPresupuestos}
              pagination
              highlightOnHover
              striped
              responsive
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PresupuestosList;
