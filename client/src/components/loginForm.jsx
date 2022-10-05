import React from "react";
import logo from "../images/logo-ANCLA.png";

const LoginForm = () => {
  return (
    <div className="flex">
      <img src={logo} />
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
        <hr></hr>
        <button>Register</button>
      </form>
    </div>
  );
};

export default LoginForm;
