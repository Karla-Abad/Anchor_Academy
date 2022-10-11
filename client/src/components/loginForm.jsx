import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import Logo from "./logo";
import RegisterForm from "./registerForm";
import Form from "./common/form";

const LoginForm = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
}) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const [registerForm, setRegisterForm] = useState(false);

  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       "http://localhost:8000/api/users/login",
  //       {
  //         email,
  //         password,
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       console.log(res, "res");
  //       console.log(res.data, "is res data!");
  //       navigate("/teachers");
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //       setErrorMessage(err.response.data.message);
  //     });
  // };

  const handleOpenForm = () => {
    setRegisterForm(!registerForm);
  };

  if (!registerForm) {
    return (
      <div className="container">
        <div className="flex">
          <Logo />
          <Form
            onSubmit={onSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
            onOpenForm={handleOpenForm}
          />
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
            <Form
              onSubmit={onSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              errorMessage={errorMessage}
              onOpenForm={handleOpenForm}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
};

export default LoginForm;
