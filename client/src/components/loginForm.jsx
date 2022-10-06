import React, { useState } from "react";
import logo from "../images/logo-ANCLA.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Instagram } from "../images/instagram.svg";
import { ReactComponent as Facebook } from "../images/facebook.svg";
import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Youtube } from "../images/youtube.svg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res, "res");
        console.log(res.data, "is res data!");
        navigate("/teachers");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <div className="container">
      <div className="flex">
        <div>
          <img src={logo} />
          <p className="main--description">
            Keep track of enrolled students and teachers for the current school
            year.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn--stretched btn--blue">Log In</button>
          <hr></hr>
          <Link to={"/register"} className="btn btn--green">
            Register
          </Link>
        </form>
      </div>
      <div className="login__footer">
        <p className="login__footer-text">
          Unidad Educativa Academia Naval Cap. Leonardo Abad A.
        </p>
        <p className="login__footer-text">Calle 19 y Avenida Malecon</p>
        <p className="login__footer-text">La Libertad, Santa Elena - Ecuador</p>
        <p className="login__footer-text">Telf: (04) 2777- 4875</p>
        <hr />
        <Instagram />
        <Facebook />
        <Twitter />
        <Youtube />
      </div>
    </div>
  );
};

export default LoginForm;
