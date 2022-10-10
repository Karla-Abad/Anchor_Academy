import logo from "../images/logo-ANCLA.png";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = (e) => {
    axios
      .post(
        "http://localhost:8000/api/users/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      });
  };
  return (
    <div>
      <nav>
        <div className="nav__menu-left">
          <img className="nav__logo" src={logo} alt="School Logo" />
          <NavLink aria-current="page" to="/teachers">
            Teachers
          </NavLink>
          <NavLink to="/students">Students</NavLink>
        </div>
        <button onClick={logout} className="btn navbar__logout">
          Logout
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
