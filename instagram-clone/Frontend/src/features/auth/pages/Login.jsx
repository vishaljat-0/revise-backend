import React, { useState } from "react";
import "../style/Form.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hook/auth.hook";


function Login() {
    const navigate = useNavigate();
    const { loading ,loginHandler} = useAuth();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginHandler(Username, Password);
    navigate("/");

    
  };
if(loading){
    return (<main><h1>Loading....</h1></main>)
}
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
