import React,{useState} from 'react'
import '../styles/Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const {v4:uuidv4}=require('uuid')
function Register(){
    const [email,setemail]=useState()
    const [password,setpassword]=useState() 
    const [confirmpassword,setconfirmpassword]=useState()
    const [name,setname]=useState()
    const navigate=useNavigate()
    
   
    const handleRegister=async (e)=>{
        e.preventDefault()
        
        if(password.length<8 || confirmpassword.length<8){
            alert('Password should be atleast 8 characters')
            return
         } 
         if(password!==confirmpassword){
         alert("Password and confirm password dont match")
          return
         }
            const id=uuidv4()
            try{
                const res=await axios.post('http://localhost:5000/Auth/register',{
                    email:email,
                    password:password,
                    name:name,
                    userid:id,
                })
               
                if(res.status===201){
                    
                    navigate('/UserDetails')
                }
            }catch(error){
                console.log("error registering",error)
            }
         
    }
  return(
        <div className='register-container'>
            <div className='register'>
            <form onSubmit={handleRegister}>
                <label className='rlabel'>Name</label>
                <input type="text" className="rinput" value={name} onChange={(e)=>setname(e.target.value)} required/>
                <label className='rlabel'>Email</label>
                <input type="email" className="rinput" required value={email} onChange={(e)=>setemail(e.target.value)}/>
                <label className="rlabel">Password</label>
                <input type="password" className="rinput" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                <label className="rlabel">Confirm Paasword</label>
                <input type="password" className="rinput" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} required/>
                <button className='rbutton' type='submit'>Register</button>
            </form></div>
        </div>
    );
}
export default Register;