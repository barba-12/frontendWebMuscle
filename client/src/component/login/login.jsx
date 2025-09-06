import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { checkStatusExercise } from "../../db/DBschede";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const utenti = ["riki", "erika"];

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); // 🔹 impedisce il refresh della pagina
    if(utenti.includes(username) && password === "121612"){
      localStorage.setItem("username", username);
      checkStatusExercise();
      onLoginSuccess(checked);
      navigate("/pagAmm"); // pagina amministratore
    } else if (username !== "" && password !== "") {
      if(utenti.includes(username)){
        localStorage.setItem("username", username);
        checkStatusExercise();
        onLoginSuccess(checked);
        navigate("/schede");
      } else {
        setMessage("Username non valido");
      }
    } else {
      setMessage("Inserisci username e password");
    }
  }

  return (
    <>
    <Container fluid className="contenitore-login">
      <Container>
        <Card className="card-login">
          <form onSubmit={handleLogin}>
            <h1 style={{marginBottom:"40px"}}>Login</h1>
            <div className="mb-3">
              <input
                type="text"
                className="form-control input-custom"
                aria-describedby="emailHelp"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control input-custom"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <div className="alert alert-warning alert-warning-login" role="alert">
                {message}
              </div>
            )}

            <div className="mb-3 form-check form-check-custom">
              <input
                type="checkbox"
                className="form-check-input check-custom"
                id="exampleCheck1"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label className="check-custom-label">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn login-button">
              Submit
            </button>
          </form>
         </Card>
      </Container>
        {/* Scritta della versione in basso a destra */}
    </Container>
    <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: "14px", color: "rgba(119, 53, 136, 0.459)" }}>
      {/*versione: 1.deploy.commit */}
      Versione 1.22.63
    </div>
    </>
  );
}