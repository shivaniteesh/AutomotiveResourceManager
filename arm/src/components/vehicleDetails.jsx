import React,{useState,useEffect} from "react";
import '../styles/vehicledetails.css'
import Cookie from 'js-cookie'
import axios from 'axios'
import { useNavigate,useLocation } from "react-router-dom";
function VehicleDetails(){
    const navigate=useNavigate()
    const location=useLocation()
   const item=location.state?.item
    const [from,setfrom]=useState('')
    const [to,setto]=useState('')
    const [total,settotal]=useState('')
    const vehicleid=item.vehicleid
    console.log(vehicleid,from,to)
    const [available,setavailable]=useState(null)
    const [userid,setuserid]=useState('')
    const [data,setData]=useState()
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
           setuserid(response.data.userid)
          } catch (error) {
            console.error("Error fetching user details", error);
          }
        };
    
        fetchUserDetails();
      }, []);
      console.log(userid)
    const checkavailable=async()=>{
        try{
        const response = await axios.post('http://localhost:5000/Auth/availability',{vehicleid,
            from,
            to,
            
        })
      console.log(response)
        setavailable(response.data.available)
        }catch(error){
            console.error(error)
            setavailable(false)
        }
    }
    const handlepay=()=>{
        if(total!=='0'){
        navigate('/Payment',{state:{vehicleid,total,from,to}})
        }
        else{
            alert('Enter proper dates')
        }
    }
    
      
    useEffect(() => {
        if (from && to) {
            const start = new Date(from);
            const end = new Date(to);
            const time = end - start;
            const days = time / (1000 * 60 * 60 * 24); 
            
            if (days > 0) {
                settotal(days * item.dailyrate);
            } else {
                settotal(0);
            }
        }
    }, [from, to, item.dailyrate]);
    const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  const oneMonthLater = new Date();
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const maxDate = oneMonthLater.toISOString().split("T")[0];
    return(
         <div className="profilediv">
                    
                        <div className="vprofilecontainer">
                           
                            <div className="vheader">
                                <h2>Vehicle Details</h2>
                            </div>
                            <div className="vprofile">
                                <h3>{item.model}</h3>
                            </div>
                            
                            <div className="vdetails">
                                <h3>Availability</h3>
                                <div><label>Type  </label>         <p><strong>{item.type}</strong></p></div>
                                
                              <div><label>Fuel Type :  </label> <p><strong>{item.fueltype}</strong></p></div>
                                <div><label>Mileage :</label>  <p><strong>{item.mileage}Km/hr</strong></p></div>
                             <div> <label>rate per day:</label> <p> <strong>{item.dailyrate}</strong></p></div>
                                <div className="vselect">
                                    <label>From Date</label>
                                    <input className='input' type="date" value={from} onChange={(e)=>setfrom(e.target.value)} min={todayFormatted} max={maxDate} required/>
                                    <label >To Date</label>
                                    <input className="input" type="date" value={to} onChange={(e)=>setto(e.target.value)} 
                                     
                                    required/>
                               </div>
                               <button className="vbutton" onClick={checkavailable}>Check Availability</button>
                               {available!==null && ( <p>{available? 'vehicle available':'vehicle not available'}</p>)}
                               {available &&(<div> <p>Total :  <strong>{total}</strong></p>
                                <button className="vbutton" onClick={handlepay}>book</button>
                              </div> )}
                                </div>
                                
                            </div>
                           
                             
                        
                        </div>
    );
}
export default VehicleDetails;