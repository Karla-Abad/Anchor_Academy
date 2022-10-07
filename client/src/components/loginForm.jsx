import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import Logo from "./logo";
import RegisterForm from "./registerForm";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [registerForm, setRegisterForm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
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

  const handleOpenForm = () => {
    setRegisterForm(!registerForm);
  };

  if (!registerForm) {
    return (
      <div className="container">
        <div className="flex">
          <Logo />
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
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button className="btn btn--stretched btn--blue">Log In</button>
            <hr></hr>
            <div className="btn btn--green" onClick={handleOpenForm}>
              Register
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  if (registerForm) {
    return (
      <div>
        <RegisterForm onOpenForm={handleOpenForm} />
        <div className="container">
          <div className="flex">
            <Logo />
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
              {errorMessage && <p className="error">{errorMessage}</p>}
              <button className="btn btn--stretched btn--blue">Log In</button>
              <hr></hr>
              <div className="btn btn--green" onClick={handleOpenForm}>
                Register
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
};

export default LoginForm;
