import React, { useState } from "react";
import "../style/Form.scss";
import { Link } from "react-router-dom";
import axios from "axios"

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/auth/login", {
      username: Username,
      password: Password,
    }, {
        withCredentials: true,
    }).then((res) => {
        console.log(res.data)
    })
    
    
    setUsername("");
    setPassword("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            onInput={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>

          <p className="toggleAuthForm">
            Don't have an account?{" "}
            <Link className="link  " to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
