import Register from "./Register";
import Login from "./loginPage";

function login({ onLoginSuccess }) {
  return (
    <div>
      <Register />
      <hr />
      <Login onLoginSuccess={onLoginSuccess}/>
    </div>
  );
}

export default login;
