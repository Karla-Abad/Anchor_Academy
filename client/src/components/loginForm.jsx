import React, { useState, useContext } from "react";
import Footer from "./footer";
import Logo from "./logo";
import RegisterForm from "./registerForm";
import Form from "./common/form";
import UserContext from "./../context/userContext";

const LoginForm = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
}) => {
  const [registerForm, setRegisterForm] = useState(false);
  const loggedInUser = useContext(UserContext);

  const handleOpenForm = () => {
    setRegisterForm(!registerForm);
  };

  return (
    <div>
      {registerForm && <RegisterForm onOpenForm={handleOpenForm} />}
      <div className="container">
        <div className="flex">
          <Logo />
          <Form
            onSubmit={onSubmit}
            loggedInUser={loggedInUser}
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
};

export default LoginForm;
