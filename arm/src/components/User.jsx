import React,{useEffect, useState} from "react";
import axios from "axios";
import '../styles/User.css'

import useVehiclestore from "../redux/useVehiclestore";

import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
function User(){
    const PaymentDone=useVehiclestore((state)=>state.PaymentDone)
    const navigate=useNavigate()
    const [data, setData] = useState([]);
   
    const handleLogout=async()=>{
        try{
            const response=await axios.post('http://localhost:5000/Auth/logout')
            console.log(response.data.message)
            navigate('/Login')
        }catch(error){
            console.error("error",error)
        }
    }
   useEffect(() => {
      const fetchuser=async () => {
          try{
             
              const token =Cookie.get("token")
              console.log("token",token)
          if (!token) {
              alert("unauthorized login")
              navigate('/login');
          }
          const email=Cookie.get('email')
          if(!email){
            console.error("email missing")
            return
          }
  
          const response=await axios.get('http://localhost:5000/Auth/User', {withCredentials:true 
          })
          
          console.log(response.data)
          }catch(error){
              console.error("error",error);
              navigate('/login');
          };
          
      }
          
         fetchuser()
     
          
      }, [navigate]);
      useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const token = Cookie.get('token');  
            if (!token) {
              alert("Unauthorized: No token found");
              return;
            }
    
            const response = await axios.get('http://localhost:5000/Auth/userDetails', { withCredentials: true });
            setData(Array.isArray(response.data) ? response.data : [response.data]);

          
          } catch (error) {
            console.error("Error fetching user details", error);
          }
        };
    
        fetchUserDetails();
      }, []);
    const [vehicle,setvehicle]=useState([])
   
    useEffect(()=>{
        axios.get('http://localhost:5000/vehicles')
        .then(response=>{
            setvehicle(response.data||[])
        })
        
        .catch(error=>{
            console.error('error fetching vehicles',error)
        })
    },[])
    const scroll=(id)=>{
        const element=document.getElementById(id)
        if(element){
            element.scrollIntoView({behavior:"smooth"})
        }
    }
    const details=(item)=>{
     navigate('/vehicledetails',{state:{item}})
    }
    const [tid,settid]=useState()
    const [vnumber,setvnumber]=useState()
     const [issue,setissue]=useState()
    const handlecomplaint=async (e)=>{
        e.preventDefault()
        try{
        const response= await axios.post('http://localhost:5000/Auth/issue',{
            issue,paymentid:tid,license:vnumber
        })
        console.log(response.data)
        }catch(error){
            console.error(error)
    }

     }
      
    return(
       
        <div className="user">
            <nav>
                <h2 className="nav" onClick={()=>scroll('about')}>About</h2>
                
                <h2 className="nav" onClick={()=>scroll('Bikes')}>Rent Vehicles</h2>
                <h2 className="nav" onClick={()=>scroll('profile1')}>Profile</h2>
                <h2 className="nav" onClick={()=>scroll('feedback')}>Complaints</h2>
            </nav>
            <section id="about">
                <h1>
                    Automotive Resource Manager
                </h1>
                <p>
                    At ARM ,we are dedicated to provide you with a seamless vehicle rental experience.Our mission is to offer a diverse fleet
                    of high quality vehicles that cater to your travel needs
                </p>
                <p>
                    Our team of experts are committed to ensuring that every vehicle meets our rigourous standards of safety and performance 
                </p>
                <p>Join us in experiencing the freedom of the open road.visit ARM manager today and drive away the perfect vehicle for your needs</p>
                <button onClick={handleLogout}>Logout</button>
            </section>
          
            <section id="Bikes">
                 <div className="maincard">
                    
                 {
                        vehicle.map((item)=>(
                            <div className="card" key={item.id}>
                              
                                    
                                    
                            <div className="card-body">
                           <h2 className="card-title">{item.model}</h2>
                            <p className="price">Rate/day:  ₹{item.dailyrate}</p>
                           
                            <div className="card-actions">
                            <button className="btn" onClick={()=>details(item)} disabled={PaymentDone}>View details and Book</button>
                            </div>
                            </div>
                            </div>
                        ))
                    }

                </div>
            </section>
            <section id="profile1">
                <div className="profilediv">
            {data.map((p)=>(
                <div className="profilecontainer" key={data.id}>
                    <div className="userheader">
                        <h2>User Profile</h2>
                    </div>
                    <div className="profile">
                        <img src={p.img} alt='profile'/>
                        <h3>{p.name}</h3>
                    </div>
                   
                    <div className="userdetails">
                        <div className='pd'><h3>User Details</h3></div>
                        <div className='pd'> <p>Id:<strong>{p.userid}</strong></p></div>
                        <div className='pd'> <p><strong>Email:</strong>{p.email}</p></div>
                        <div className='pd'> <p><strong>Phone Number:</strong>{p.phone}</p></div>
                        <div className='pd'> <p><strong>Aadhar:</strong>{p.aadhar}</p></div>
                        <div className='pd'> <p><strong>Driving license</strong>{p.license}</p></div>
                        </div>

                    </div>
                    ))}
                
                </div>
            </section>
            <section id="feedback">
             
                <form id="fb" onSubmit={handlecomplaint}>
                    <label>Transaction id:</label>
                    <input type="text" value={tid} onChange={(e)=>settid(e.target.value)} />
                    <label >Vehicle Number</label>
                    <input type="text" value={vnumber} onChange={(e)=>setvnumber(e.target.value)} />
                    <label >Issue</label>
                    <textarea  cols="30" rows="10" value={issue} onChange={(e)=>setissue(e.target.value)}></textarea>
                    <button type="submit">Report</button>
                </form>
            </section>
            
        </div>
    );
}
export default User;