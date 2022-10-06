import React from "react";
import logo from "../images/logo-ANCLA.png";
import { ReactComponent as Instagram } from "../images/instagram.svg";
import { ReactComponent as Facebook } from "../images/facebook.svg";
import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Youtube } from "../images/youtube.svg";

const LoginForm = () => {
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
        <form>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="btn btn--stretched btn--blue">Log In</button>
          <hr></hr>
          <button className="btn btn--green">Register</button>
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
