import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PaginaEsercizi from './component/esercizi/paginaEsercizi';
import PaginaSchede from "./component/schede/paginaSchede";
import Giorni from "./component/schede/giorni";
import EsercizioScheda from "./component/esercizi/esercizioScheda";
import Login from "./component/login/login";
import AggiungiScheda from "./component/schede/aggiungiScheda";
import exerciseData from './data/exercise';
import PagSelezionaEs from "./component/esercizi/pagSelezionaEs";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  // Funzione che il componente Login chiamerà quando il login va a buon fine
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
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
        <Route path="/esercizioScheda" element={
          <PrivateRoute>
            <EsercizioScheda />
          </PrivateRoute>
        } />
        <Route path="/aggiungiScheda" element={
          <PrivateRoute>
            <AggiungiScheda />
          </PrivateRoute>
        } />
        <Route path="/pagSelezionaEs" element={
          <PrivateRoute>
            <PagSelezionaEs esercizi={exerciseData}/>
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;