import React from 'react'
import '../style/navbar.style.scss'
import { useNavigate } from 'react-router-dom'
useNavigate
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className='nav-bar'>
        <h1>Instagram</h1>
        <button onClick={() => navigate('/createpost')} className='button primary-btn'>Create post</button>
    </nav>
  )
}

export default Navbar