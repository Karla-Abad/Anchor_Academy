import React, { useState } from "react";
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
}) => {
  const [registerForm, setRegisterForm] = useState(false);

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
