import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import ConstructorForm from "./pages/ConstructorForm";
import ConstructoresList from "./pages/ConstructoresList";

import ObraPublicaForm from "./pages/ObraPublicaForm";
import ObrasPublicasList from "./pages/ObrasPublicasList";

import PresupuestoForm from "./pages/PresupuestoForm";
import PresupuestosList from "./pages/PresupuestosList";

import FechaInicioForm from "./pages/FechaInicioForm";
import FechasInicioList from "./pages/FechasInicioList";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/constructores" element={<ConstructoresList />} />
          <Route path="/constructores/nuevo" element={<ConstructorForm />} />
          <Route path="/constructores/editar/:id" element={<ConstructorForm />} />

          <Route path="/obraspublicas" element={<ObrasPublicasList />} />
          <Route path="/obraspublicas/nuevo" element={<ObraPublicaForm />} />
          <Route path="/obraspublicas/editar/:id" element={<ObraPublicaForm />} />

          <Route path="/presupuestos" element={<PresupuestosList />} />
          <Route path="/presupuestos/nuevo" element={<PresupuestoForm />} />
          <Route path="/presupuestos/editar/:id" element={<PresupuestoForm />} />

          <Route path="/fechas" element={<FechasInicioList />} />
          <Route path="/fechas/nuevo" element={<FechaInicioForm />} />
          <Route path="/fechas/editar/:id" element={<FechaInicioForm />} />
        </Routes>
    </Router>
  );
}

export default App;


