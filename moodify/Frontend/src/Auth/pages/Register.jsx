import React from "react";
import FormGroup from "../components/FormGroup";
import "./style/register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; 
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const { handleregiter } = useAuth()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async(e) => {  
        e.preventDefault()
       
        await  handleregiter({ username, email, password })
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/login')

    }
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={(e)=>handleSubmit(e)} >
          <FormGroup   onChange={(e)=>setUsername(e.target.value)}  value={username} label="username" placeholder="Enter your username"  />

          <FormGroup  onChange={(e)=>setEmail(e.target.value)} value={email} label="Email" placeholder="Enter your email" />
          <FormGroup onChange={(e)=>setPassword(e.target.value)}  value={password} label="Password" placeholder="Enter your password" />

          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
