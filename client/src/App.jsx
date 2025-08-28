import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PaginaEsercizi from './component/esercizi/paginaEsercizi';
import PaginaSchede from "./component/schede/paginaSchede";
import Giorni from "./component/schede/giorni";
import Login from "./component/login/login";
import AggiungiScheda from "./component/schede/aggiungiScheda";
import exerciseData from './data/exercise';
import PaginaEserciziScheda from "./component/esercizi/paginaEserciziScheda";
import DettaglioEsercizioScheda from "./component/esercizi/dettaglioEsercizioScheda";
import DettaglioEsGenerico from "./component/esercizi/dettaglioEsGenerico";
import AddEsSchedaEsistente from "./component/esercizi/addEsSchedaEsistente";
import PagAmm from "./component/amministratore/pagAmm";
import AddEsScheda from "./component/esercizi/addEsScheda";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true" ||
    sessionStorage.getItem("loggedIn") === "true"
  );

  // chiamata quando il login va a buon fine
  const handleLoginSuccess = (checked) => {
    if (checked) {
      // persistente
      localStorage.setItem("loggedIn", "true");
      sessionStorage.removeItem("loggedIn"); // pulizia se c’era
    } else {
      // solo per la sessione
      sessionStorage.setItem("loggedIn", "true");
      localStorage.removeItem("loggedIn"); // pulizia se c’era
    }
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
        <Route path="/pagAmm" element={
          <PrivateRoute>
            <PagAmm />
          </PrivateRoute>
        } />
        <Route path="/schede" element={
          <PrivateRoute>
            <PaginaSchede />
          </PrivateRoute>
        } />
        <Route path="/addEsSchedaEsistente/:idScheda" element={
          <PrivateRoute>
            <AddEsSchedaEsistente />
          </PrivateRoute>
        } />
        <Route path="/dettaglioEsScheda/:esercizioId/:schedaId" element={
          <PrivateRoute>
            <DettaglioEsercizioScheda />
          </PrivateRoute>
        } />
        <Route path="/giorni/:schedaId" element={
          <PrivateRoute>
            <Giorni />
          </PrivateRoute>
        } />
        <Route path="/dettaglioEsGenerico/:esercizioId" element={
          <PrivateRoute>
            <DettaglioEsGenerico />
          </PrivateRoute>
        } />
        <Route path="/addEsScheda" element={
          <PrivateRoute>
            <AddEsScheda />
          </PrivateRoute>
        } />
        <Route path="/eserciziXGiorno/:schedaId/:giorno" element={
          <PrivateRoute>
            <PaginaEserciziScheda/>
          </PrivateRoute>
        } />
        <Route path="/aggiungiScheda" element={
          <PrivateRoute>
            <AggiungiScheda />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

/*

<Route path="/esercizioScheda/:IdEsercizio/:schedaId" element={
  <PrivateRoute>
    <EsercizioScheda />
  </PrivateRoute>
} />
<Route path="/esercizioScheda/:IdEsercizio" element={
  <PrivateRoute>
    <EsercizioScheda />
  </PrivateRoute>
} />

*/

export default App;