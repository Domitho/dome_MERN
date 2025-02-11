import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sistema de Administracion de Obras Públicas</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          </div>
        </div>
      </nav>
      
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
        <h1 className="mb-4 fw-bold">Sistema de Gestión</h1>
        <div className="row g-3 text-center">
          <div className="col-md-6">
            <Link to="/constructores" className="btn btn-primary w-100 py-3">
              Constructores
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/obraspublicas" className="btn btn-success w-100 py-3">
              Obras Públicas
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/presupuestos" className="btn btn-warning w-100 py-3">
              Presupuestos
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/fechas" className="btn btn-danger w-100 py-3">
              Fechas de Inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
