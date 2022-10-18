import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onOpenForm }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}api/users/register`,
        {
          username,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setUsers([...users, res.data]);
        setConfirmReg("Thank you for registering. You can now log in.");
        setErrors({});
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="register__container">
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__flex">
          <h1 className="register__title">Register Here</h1>
          <p className="register__close" onClick={onOpenForm}>
            X
          </p>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <p className="error">{errors.firstName.message}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmReg ? <p className="success">{confirmReg}</p> : null}
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}
        <button className="btn btn--stretched btn--green">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
