import React, { useState } from "react";
import '../styles/ForgotPassword.css';
import { useNavigate } from "react-router-dom";
function ForgotPassword(){
    const [email,setemail]=useState()
    const navigate=useNavigate()
    const reset=(e)=>{
        e.preventDefault()
        let result=window.confirm("Reset link sent")
        if(result){
            navigate('/Login')
        }
    }
    return(
        <div className="fd">
            <h2 className="fph">Reset Password</h2>
            <form onSubmit={reset} className="fp">
                <label className="fl">Email</label>
                <input className="fi" type="enail" placeholder="Enter your email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
                <button type="submit" className="fb">Submit</button>
            </form>
        </div>
    );
}
export default ForgotPassword;