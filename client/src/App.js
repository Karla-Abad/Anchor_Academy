import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Teachers from "./components/teachers";
import RegisterForm from "./components/registerForm";
import Students from "./components/students";
import Navbar from "./components/navbar";
import UserContext from "./context/userContext";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");

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
        setEmail("");
        setPassword("");
        setErrorMessage("");
        setCurrentUser(res.data.userLoggedIn);
        navigate("/teachers");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                onSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<Navbar />}>
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
