import React from "react";
import logo from "../images/logo-ANCLA.png";

const LoginForm = () => {
  return (
    <div className="container">
      <div className="flex">
        <div>
          <img src={logo} />
          <p>
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
      <div className="login__foter">General Information Footer</div>
    </div>
  );
};

export default LoginForm;
