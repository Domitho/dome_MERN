import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const ConstructoresList = () => {
  const [constructores, setConstructores] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/constructores")
      .then((res) => res.json())
      .then((data) => setConstructores(data))
      .catch((err) => console.error("Error al obtener constructores:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este constructor?")) {
      try {
        await fetch(`http://localhost:5000/api/constructores/${id}`, {
          method: "DELETE",
        });
        setConstructores(constructores.filter((constructor) => constructor._id !== id));
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  const columns = [
    { name: "Nombre", selector: row => row.nombre, sortable: true },
    { name: "Empresa", selector: row => row.empresa, sortable: true },
    { name: "Teléfono", selector: row => row.contacto, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-warning" onClick={() => navigate(`/constructores/editar/${row._id}`)}>
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

  const filteredConstructores = constructores.filter(constructor => 
    constructor.nombre.toLowerCase().includes(search.toLowerCase()) ||
    constructor.empresa.toLowerCase().includes(search.toLowerCase()) ||
    constructor.contacto.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">Constructores</a>
        </div>
      </nav>
      <div className="container mt-4 p-4 bg-light rounded shadow">
        <h2 className="text-center mb-4">Lista de Constructores</h2>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-success" onClick={() => navigate("/constructores/nuevo")}>
            <i className="bi bi-plus-lg"></i> Agregar Constructor
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
            data={filteredConstructores}
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

export default ConstructoresList;
