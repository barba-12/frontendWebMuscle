import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllSchedeDB, clearDB } from "../../db/indexedDB"; // Assumo sia implementata

function PagAmm() {
  const [sessionData, setSessionData] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [indexedDBData, setIndexedDBData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: [] });

  // nuovo stato per conferma eliminazione
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    const sessionEntries = Object.entries(sessionStorage).filter(([key]) => key !== "bis_data");
    const localEntries = Object.entries(localStorage);
    const indexedDBEntries = await getAllSchedeDB(); // Deve restituire un array

    setSessionData(sessionEntries);
    setLocalData(localEntries);
    setIndexedDBData(indexedDBEntries);
  };

  const handleClear = async (type) => {
    if (type === "session") {
      sessionStorage.clear();
      setSessionData([]);
    } else if (type === "local") {
      localStorage.clear();
      setLocalData([]);
    } else if (type === "indexedDB") {
      await clearDB();
      setIndexedDBData([]);
    }
    setShowConfirm(false); // chiudi modale conferma
  };

  const handleShowModal = (type, data) => {
    const titles = {
      session: "Session Storage",
      local: "Local Storage",
      indexedDB: "IndexedDB",
    };
    setModalContent({ title: titles[type], data });
    setShowModal(true);
  };

  // funzione per espandere IndexedDB
  const flattenRecord = (record, prefix = "") => {
    let result = [];
    Object.entries(record).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
        value.forEach((item, idx) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            result.push([`${prefix}${key}[${idx}].${subKey}`, subValue]);
          });
        });
      } else {
        result.push([`${prefix}${key}`, value]);
      }
    });
    return result;
  };

  const renderSimpleTable = (data) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Chiave</th>
          <th>Valore</th>
        </tr>
      </thead>
      <tbody>
        {data.map(([key, value], index) => (
          <tr key={index}>
            <td>{key}</td>
            <td>{typeof value === "object" ? JSON.stringify(value) : value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderIndexedDBTable = (data) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Chiave</th>
          <th>Valore</th>
        </tr>
      </thead>
      <tbody>
        {data.flatMap(([key, value], index) =>
          flattenRecord(value, `${key}.`).map(([k, v], subIndex) => (
            <tr key={`${index}-${subIndex}`}>
              <td>{k}</td>
              <td>{v !== null && typeof v === "object" ? JSON.stringify(v) : v.toString()}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );

  return (
    <Container fluid className="project-section">
      <Container>
        <Link to="/login">
          <Button variant="primary" className="mb-3">
            Torna al login
          </Button>
        </Link>

        <h1 className="project-heading">Pagina Amministratore</h1>

        <div className="mb-4">
          <h4>Gestione Storage</h4>
          <Button variant="info" className="m-2" onClick={() => handleShowModal("session", sessionData)}>
            Visualizza SessionStorage
          </Button>
          <Button variant="info" className="m-2" onClick={() => handleShowModal("local", localData)}>
            Visualizza LocalStorage
          </Button>
          <Button
            variant="info"
            className="m-2"
            onClick={() => handleShowModal("indexedDB", indexedDBData.map((entry, idx) => [`Record ${idx + 1}`, entry]))}
          >
            Visualizza IndexedDB
          </Button>

          <hr />

          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("session"); setShowConfirm(true); }}>
            Svuota SessionStorage
          </Button>
          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("local"); setShowConfirm(true); }}>
            Svuota LocalStorage
          </Button>
          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("indexedDB"); setShowConfirm(true); }}>
            Svuota IndexedDB
          </Button>
        </div>

        {/* Modal per visualizzare contenuti */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent.data.length === 0 ? (
              <p>Nessun dato presente.</p>
            ) : modalContent.title === "IndexedDB" ? (
              renderIndexedDBTable(modalContent.data)
            ) : (
              renderSimpleTable(modalContent.data)
            )}
          </Modal.Body>
        </Modal>

        {/* Modal di conferma eliminazione */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Conferma eliminazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sei sicuro di voler <strong>svuotare {deleteTarget}</strong>?<br />
            L’operazione non può essere annullata.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Annulla
            </Button>
            <Button variant="danger" onClick={() => handleClear(deleteTarget)}>
              Elimina
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default PagAmm;