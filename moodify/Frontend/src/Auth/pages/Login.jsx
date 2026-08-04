import React from "react";
import "./style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const { user, loading,handlelogin } = useAuth();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSub = async(e) => {
    e.preventDefault();
    setusername("");
    setemail("");
    setpassword("");
    await handlelogin({  email, password });
    navigate("/");

  };
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={(e) => handleSub(e)}>
          <FormGroup
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />
          <FormGroup
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
