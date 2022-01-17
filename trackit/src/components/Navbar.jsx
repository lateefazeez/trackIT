import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

// styles & images
import "./Navbar.css";
import Spinner from "./Spinner";

const Navbar = () => {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <div className="trackit-logo"></div>
          <span>
            <Link to="/">trackIT</Link>
          </span>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled>
              <Spinner />
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
