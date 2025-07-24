import React from 'react';
import '../styles/AboutUs.css'
import { useNavigate } from 'react-router-dom';
function AboutUs(){
    const navigate=useNavigate()
    const handleclick=()=>{
        navigate('/Login')
    }
    return(
        <div className='AboutUs'>
            <h1 id="AboutUs">Welcome to Automotive Resource Manager</h1>
            <button id="abutton" onClick={handleclick}>Get started</button>

        </div>
    );
}
export default AboutUs;