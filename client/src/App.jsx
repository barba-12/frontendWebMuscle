import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PaginaEsercizi from './component/esercizi/paginaEsercizi';
import PaginaSchede from "./component/schede/paginaSchede";
import Giorni from "./component/schede/giorni";
import PagEsCompleta from "./component/esercizi/pagEsCompleta";
import Login from "./component/login/login";
import exerciseData from './data/exercise';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Funzione che il componente Login chiamerà quando il login va a buon fine
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Componente per rotte protette
  function PrivateRoute({ children }) {
    return isLoggedIn ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        <Route path="/" element={
          <PrivateRoute>
            <PaginaEsercizi esercizi={exerciseData} />
          </PrivateRoute>
        } />
        <Route path="/schede" element={
          <PrivateRoute>
            <PaginaSchede />
          </PrivateRoute>
        } />
        <Route path="/giorni" element={
          <PrivateRoute>
            <Giorni />
          </PrivateRoute>
        } />
        <Route path="/eserciziXGiorno" element={
          <PrivateRoute>
            <PaginaEsercizi esercizi={null} />
          </PrivateRoute>
        } />
        <Route path="/pagEsCompleta" element={
          <PrivateRoute>
            <PagEsCompleta />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;