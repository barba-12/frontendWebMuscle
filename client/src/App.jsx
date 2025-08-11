import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import PaginaEsercizi from './component/esercizi/paginaEsercizi';
import PaginaSchede from "./component/schede/paginaSchede";
import Giorni from "./component/schede/giorni";
import 'bootstrap/dist/css/bootstrap.min.css';
import exerciseData from './data/exercise';
import PagEsCompleta from "./component/esercizi/pagEsCompleta";

function App() {
  return (
    <Router>
      <div>
        {/* header */}

        <Routes>
          <Route path="/" element={<PaginaEsercizi esercizi={exerciseData}/>} />
          <Route path="/schede" element={<PaginaSchede />} />
          <Route path="/giorni" element={<Giorni />} />
          <Route path="/eserciziXGiorno" element={<PaginaEsercizi esercizi={null}/>} />
          <Route path="/pagEsCompleta" element={<PagEsCompleta />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* footer */}
      </div>
    </Router>
  );
}

export default App;
