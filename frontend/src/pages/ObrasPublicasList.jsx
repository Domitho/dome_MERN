import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const ObrasPublicasList = () => {
  const [obras, setObras] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/obras-publicas")
      .then((res) => setObras(res.data))
      .catch((err) => console.error("Error al obtener obras públicas:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta obra pública?")) {
      try {
        await axios.delete(`http://localhost:5000/api/obras-publicas/${id}`);
        setObras(obras.filter((obra) => obra._id !== id));
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Ubicación", selector: (row) => row.ubicacion, sortable: true },
    { name: "Código", selector: (row) => row.codigo, sortable: true },
    { name: "Constructor", selector: (row) => row.constructor?.nombre, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-warning" onClick={() => navigate(`/obraspublicas/editar/${row._id}`)}>
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(row._id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredObras = obras.filter(
    (obra) =>
      obra.nombre.toLowerCase().includes(search.toLowerCase()) ||
      obra.ubicacion.toLowerCase().includes(search.toLowerCase()) ||
      obra.codigo.toLowerCase().includes(search.toLowerCase()) ||
      obra.constructor?.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Obras Públicas</a>
        </div>
      </nav>
      <div className="container mt-4 p-4 bg-light rounded shadow">
        <h2 className="text-center mb-4">Lista de Obras Públicas</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={() => navigate("/obraspublicas/nuevo")}> 
            <i className="bi bi-plus-lg"></i> Agregar Obra Pública
          </button>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white p-3 rounded shadow">
          <DataTable
            columns={columns}
            data={filteredObras}
            pagination
            highlightOnHover
            striped
            responsive
          />
        </div>
      </div>
    </>
  );
};

export default ObrasPublicasList;
