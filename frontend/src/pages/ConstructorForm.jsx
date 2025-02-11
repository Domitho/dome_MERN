import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConstructorForm = () => {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [contacto, setTelefono] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Para detectar si es edición

  // Cargar datos si es edición
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/constructores/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre);
          setEmpresa(data.empresa);
          setTelefono(data.contacto);
        })
        .catch((err) => console.error("Error al obtener constructor:", err));
    }
  }, [id]);

  // Guardar o actualizar constructor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const constructorData = { nombre, empresa, contacto };

    try {
      if (id) {
        // Actualizar constructor
        await fetch(`http://localhost:5000/api/constructores/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(constructorData),
        });
      } else {
        // Crear nuevo constructor
        await fetch("http://localhost:5000/api/constructores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(constructorData),
        });
      }
      navigate("/constructores"); // Redirigir después de guardar
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">{id ? "Editar Constructor" : "Agregar Constructor"}</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Empresa</label>
          <input
            type="text"
            className="form-control"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            value={contacto}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Actualizar" : "Guardar"}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/constructores")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ConstructorForm;
