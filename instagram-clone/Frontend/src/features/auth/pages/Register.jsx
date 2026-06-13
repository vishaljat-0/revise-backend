import React, { useState } from "react";
import "../style/Form.scss";
import { useAuth } from "../hook/auth.hook";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
function Register() {
    const { registerHandler, loading } = useAuth();
    const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await registerHandler(Username, Email, Password);
    navigate("/");

    
  };
  if (loading) {
      return (
        <main>
          <h1>Loading....</h1>
        </main>
      );
    }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Register</button>

          <p className="toggleAuthForm">
            {" "}
            have an account?{" "}
            <Link className="link  " to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
