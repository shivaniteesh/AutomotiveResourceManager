import React ,{ useState} from "react";
import '../styles/UserDetails.css'
import axios from 'axios'

import { useNavigate } from "react-router-dom";

function UserDetails(){
 
    const [fullname,setfullname]=useState('');
    
    const [Aadhar,setaadhar]=useState('');
    
    const [license,setlicense]=useState('');

    const [address,setaddress]=useState('');
    const [email,setemail]=useState('')
        const [password,setpassword]=useState('') 
        const [confirmpassword,setconfirmpassword]=useState('')
        const [Phone,setphone]=useState('');
    const navigate=useNavigate()

    
    const  handleUser=async (e)=>{
        e.preventDefault()
        if(password!==confirmpassword){
            alert("password and confirm password dont match")
            return
        }
        if(password.length<8 || confirmpassword.length<8){
            alert("password or confirm password cannot be less then 8 characters")
            return
        }
        if(license.length<12 || Aadhar.length<12){
            alert("driving license or aadharf cannot be less then 12 characters")
            return
        }
        

        const formData = new FormData();
        formData.append('name', fullname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', Phone);
        
        formData.append('aadhar', Aadhar);
     
        formData.append('license', license);
        
        formData.append('address', address);
        
        try{
         
            await axios.post('http://localhost:5000/Auth/userDetails', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            alert("user details updated")
            navigate('/Login')
            
        }catch(error){
            console.log("Error registering user",error)
        }
        
    }
    return(
      
        <div className="userdetailscontainer">
            <div className="userdetails">
                <form onSubmit={handleUser}>
                <label className='ulabel'>Email</label>
                <input type="email" className="uinput" required value={email} onChange={(e)=>setemail(e.target.value)}/>
                <label className="ulabel">Password</label>
                <input type="password" className="uinput" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                <label className="ulabel">Confirm Paasword</label>
                <input type="password" className="uinput" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} required/>
                 
                    <label className="ulabel">Full Name</label>
                    <input type="text" className="uinput" value={fullname} onChange={(e)=>setfullname(e.target.value)} required/>
                    <label className="ulabel">Phone Number</label>
                    <input type="tel" className="uinput" value={Phone} onChange={(e)=>setphone(e.target.value)} maxLength={10} required/>

                    <label className="ulabel">Aadhar number</label>
                    <input type="text" className="uinput" value={Aadhar} onChange={(e)=>setaadhar(e.target.value)} maxLength={12} required/>
                  
                    <label className="ulabel">Driving license number</label>
                    <input type="text"className="uinput" value={license} onChange={(e)=>setlicense(e.target.value)} maxLength={12} required/>
                    <label className="ulabel">Address</label>
                    <textarea rows="5" className="uaddress" value={address} onChange={(e)=>setaddress(e.target.value)}  required/>
                    
                    <button type="submit" className="ubutton">Submit</button>
                    </form>

            </div>

        </div>
    );
}
export default UserDetails;