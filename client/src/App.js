import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import Teachers from "./components/teachers";
import RegisterForm from "./components/registerForm";
import Students from "./components/students";
import Navbar from "./components/navbar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<Navbar />}>
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
