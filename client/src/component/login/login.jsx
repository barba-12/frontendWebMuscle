import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkStatusExercise } from "../../db/indexedDB";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); // 🔹 impedisce il refresh della pagina
    if (username !== "" && password !== "") {
      checkStatusExercise();
      onLoginSuccess(checked);
      navigate("/"); // 🔹 naviga subito dopo il login
    } else {
      setMessage("Inserisci username e password");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>


      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="checkDefault"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="checkDefault">
          Default checkbox
        </label>
      </div>


      {message && <p>{message}</p>}
    </form>
  );
}