import logo from "../images/logo-ANCLA.png";
import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
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
        <button className="btn navbar__logout">Logout</button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
