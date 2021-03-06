import { useLogin } from "../../hooks/useLogin";
import Spinner from "../../components/Spinner/Spinner";

// styles
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-header">Login</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn-login-signup">Login</button>}
      {isPending && (
        <button className="btn-login-signup" disabled>
          <Spinner />
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
