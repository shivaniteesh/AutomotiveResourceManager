import React,{useState} from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'
function Login(){
    const [role,setrole]=useState('user')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('') 
    const navigate=useNavigate();
    const Forgot=()=>{
        navigate('/ForgotPassword')
    }
    const handleLogin=async(e)=>{
        e.preventDefault()
        
        
        console.log("handlelogin")
     if(password.length<8){
        alert('Password should be atleast 8 characters')
        return
     }  
    try{
       
        const res=await axios.post('http://localhost:5000/Auth/login',{
            email,password,role
            
        } ,{withCredentials:true});
        
        console.log({email,password,role})
       console.log("res.data--",res.data)
   
      const token=Cookie.get("token")
      
       console.log('token',token)
       if (role === 'User') {
        navigate('/User');
    } else if (role === 'Admin') {
        navigate('/admin');
    }
     }catch(error){
        console.error(error);
        alert(error.response ? error.response.data.message : 'Login failed');
        
     }
    
    }
    const handleRegister=(e)=>{
    e.preventDefault()
        navigate('/UserDetails')
    }
  return(
        <div className='login-container'>
            <div className='login'>
            <form onSubmit={handleLogin}>
                <label className="llabel">Role</label>
                <select  className="linput"  title='choose an option' value={role} onChange={(e)=>setrole(e.target.value)}>
                    <option value="User" >User</option>
                    <option value="Admin">Admin</option>
                </select>
                <label className='llabel'>Email</label>
                <input type="email" className="linput"  value={email} onChange={(e)=>setemail(e.target.value)} required/>
                <label className="llabel">Password</label>
                <input type="password" className="linput" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                <button className='lbutton' type='submit'>Login</button>
                <p className='link' onClick={Forgot}>Forgot password?</p>
                <p className='link' onClick={handleRegister}>New user? Register</p>
            </form></div>
        </div>
    );
}
export default Login;