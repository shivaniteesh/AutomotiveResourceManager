import React, { useState } from "react";
function Reset(){
    const [password,setpassword]=useState()
    const [cpassword,setcpassword]=useState()
    return(
    <div className="fd">
        <h2>New Paasword</h2>
        <form>
            <label className="fl">new password</label>
            <input className="fi" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
            <label className="fl">confirm password</label>
            <input className="fi" type="password" value={cpassword} onChange={(e)=>setcpassword(e.target.value)} required/>
            <button>Reset</button>
        </form>
    </div>
    );
}
export default Reset;