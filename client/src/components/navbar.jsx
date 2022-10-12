import logo from "../images/logo-ANCLA.png";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import { Outlet } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const loggedInUser = useContext(UserContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/secure", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  console.log(loggedInUser.currentUser);
  return (
    <div>
      <nav>
        <div className="nav__menu-left">
          <img className="nav__logo" src={logo} alt="School Logo" />
          <NavLink aria-current="page" to="/teachers">
            Teachers
          </NavLink>
          <NavLink to="/students">Students</NavLink>
          <h1 className="form__title">Welcome back, {user.username}!</h1>
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
