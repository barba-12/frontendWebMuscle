import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllSchedeDB, clearDB, resetAllStatusEs } from "../../db/DBschede"; // Assumo sia implementata
import { getAllEserciziBase, clearDB as clearDBDati, getAllEsercizi, resetEserciziKeepFirst} from "../../db/DBdatiEsercizi";

function PagAmm() {
  const [sessionData, setSessionData] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [indexedDBData, setIndexedDBData] = useState([]);
  const [indexedDBDati, setIndexedDBDati] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: [] });
  const [showModalJSON, setShowModalJSON] = useState(false);
  const [pass, setPass] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const STORE_NAME = "schede";

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
    const indexedDBDatiEntries = await getAllEserciziBase();

    setSessionData(sessionEntries);
    setLocalData(localEntries);
    setIndexedDBData(indexedDBEntries);
    setIndexedDBDati(indexedDBDatiEntries);
  };

  //da eliminare dati su DB
  const scaricaJSONEsercizi = async () => {
    if (pass !== "Amministratore12") {
      setShowMessage(true);
      return;
    }

    const eserciziFinali = await getAllEsercizi(); // già merge DB + JSON
    const jsonExport = JSON.stringify(eserciziFinali, null, 2);

    const blob = new Blob([jsonExport], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "esercizi.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    resetEserciziKeepFirst();

    setShowModalJSON(false);
    setPass("");
    setShowMessage(false);
  };

  const resettaEs = async () => {
    if(pass == "Amministratore12"){
      await resetAllStatusEs();
      setShowModalReset(false);
      setPass("");
      setShowMessage(false);
    } else setShowMessage(true);
  }

  const handleClear = async (type) => {
    if(pass == "Amministratore12"){
      if (type === "session") {
        sessionStorage.clear();
        setSessionData([]);
      } else if (type === "local") {
        localStorage.clear();
        setLocalData([]);
      } else if (type === "indexedDBSchede") {
        await clearDB();
        setIndexedDBData([]);
      } else if (type === "indexedDBDati") {
        await clearDBDati();
        setIndexedDBDati([]);
      }
      setShowConfirm(false); // chiudi modale conferma
      setPass("");
      setShowMessage(false);
    } else {
      setShowMessage(true);
    }
  };

  const handleShowModal = (type, data) => {
    const titles = {
      session: "Session Storage",
      local: "Local Storage",
      indexedDBSchede: "IndexedDB Schede",   // aggiunta
      indexedDBDati: "IndexedDB Dati Esercizi", // già la usi
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
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-custom">Chiave</th>
            <th className="table-custom">Valore</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([key, value], index) => (
            <tr key={index}>
              <td className="table-custom">{key}</td>
              <td className="table-custom">{typeof value === "object" ? JSON.stringify(value) : value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const renderIndexedDBTable = (data) => (
    <div className="table-responsive" >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-custom">Chiave</th>
            <th className="table-custom">Valore</th>
          </tr>
        </thead>
        <tbody>
          {data.flatMap(([key, value], index) =>
            flattenRecord(value, `${key}.`).map(([k, v], subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td className="table-custom">{k}</td>
                <td className="table-custom">{v !== null && typeof v === "object" ? JSON.stringify(v) : v.toString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
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
          <Button variant="primary" className="m-2" onClick={() => handleShowModal("session", sessionData)}>
            Visualizza SessionStorage
          </Button>
          <Button variant="primary" className="m-2" onClick={() => handleShowModal("local", localData)}>
            Visualizza LocalStorage
          </Button>
          <Button variant="primary" className="m-2" onClick={() => handleShowModal("indexedDBSchede", indexedDBData.map((entry, idx) => [`Record ${idx + 1}`, entry]))} >
            Visualizza IndexedDB schede
          </Button>
          <Button variant="primary" className="m-2" onClick={() => handleShowModal("indexedDBDati", indexedDBDati.map((entry, idx) => [`Record ${idx + 1}`, entry]))} >
            Visualizza IndexedDB dati esercizi
          </Button>

          <hr style={{border:"2px solid #752eb8"}}/>

          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("session"); setShowConfirm(true); }}>
            Svuota SessionStorage
          </Button>
          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("local"); setShowConfirm(true); }}>
            Svuota LocalStorage
          </Button>
          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("indexedDBSchede"); setShowConfirm(true); }}>
            Svuota IndexedDB schede
          </Button>
          <Button variant="danger" className="m-2" onClick={() => { setDeleteTarget("indexedDBDati"); setShowConfirm(true); }}>
            Svuota IndexedDB dati esercizi
          </Button>

          <Button variant="danger" className="m-2" onClick={() => { setShowModalJSON(true); }}>
            Scarica JSON
          </Button>

          <Button variant="warning" className="m-2" onClick={() => { setShowModalReset(true); }}>
            Resetta stato esercizi
          </Button>
        </div>

        {/* Modal per visualizzare contenuti */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>{modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
            {modalContent.data.length === 0 ? (
              <p>Nessun dato presente.</p>
            ) : (modalContent.title === "IndexedDB Dati Esercizi" || modalContent.title ===  "IndexedDB Schede") ? (
              renderIndexedDBTable(modalContent.data)
            ) : (
              renderSimpleTable(modalContent.data)
            )}
          </Modal.Body>
        </Modal>

        {/* Modal di conferma eliminazione */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>Conferma eliminazione</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
            Sei sicuro di voler <strong>svuotare {deleteTarget}</strong>?<br />
            L’operazione non può essere annullata.
            <Form>
              {/* PASSWORD AMM */}
              <Form.Label>Password Amministratore</Form.Label>
              <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control input-custom"/>

              {showMessage && (
                <div className="alert alert-warning alert-warning-login" role="alert">
                  Password Errata
                </div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-header-glass">
            <Button variant="danger" onClick={() => handleClear(deleteTarget)}>
              Elimina
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalJSON} onHide={() => setShowModalJSON(false)} centered>
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>Scaricaggio JSON</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
            <Form>
                <Form.Label>Immetendo la password amministratore, eliminerai PERMANENTEMENTE i dati salvati in indexedDB, successivamente verrà scaricato un file json che protrà essere inserito manualmente nei file del sito.</Form.Label>
                {/* PASSWORD AMM */}
                <Form.Label>Password Amministratore</Form.Label>
                <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control input-custom"/>

                {showMessage && (
                  <div className="alert alert-warning alert-warning-login" role="alert">
                    Password Errata
                  </div>
                )}
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-header-glass">
            <Button variant="success" onClick={scaricaJSONEsercizi}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalReset} onHide={() => setShowModalReset(false)} centered>
          <Modal.Header closeButton className="modal-header-glass">
            <Modal.Title>Reset stato esercizi</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-header-glass">
            <Form>
                <Form.Label>Immetendo la password amministratore, resetterai lo stato degli esercizi</Form.Label>
                {/* PASSWORD AMM */}
                <Form.Label>Password Amministratore</Form.Label>
                <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control input-custom"/>

                {showMessage && (
                  <div className="alert alert-warning alert-warning-login" role="alert">
                    Password Errata
                  </div>
                )}
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-header-glass">
            <Button variant="success" onClick={resettaEs}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default PagAmm;