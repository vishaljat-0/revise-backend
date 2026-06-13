import React, { useState } from "react";
import "../style/Form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
function Register() {

      const [Username, setUsername] = useState("")
        const [Email, setEmail] = useState('')
        const [Password, setPassword] = useState('')

const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/auth/register",{
        username: Username,
        email: Email,
        password: Password
    },{
        withCredentials:true
    }).then((res)=>{
        console.log(res.data)
    })
    
    
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={(e)=>submitHandler(e)}>
          <input
          onInput={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" />
          <input
           onInput={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
          <input
           onInput={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
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
