import React,{useState,useEffect} from "react";
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import useVehiclestore from '../redux/useVehiclestore';
import Cookie from 'js-cookie'
import '../styles/Payment.css'
function Payment(){
    const navigate=useNavigate()
    const location=useLocation()
    const {vehicleid,total,from,to}=location.state || {}
    const setPaymentDone = useVehiclestore((state) => state.setPaymentDone);
    const [userid,setuserid]=useState()
    const [data,setData]=useState()
    const [name,setname]=useState()
    const [cno,setcno]=useState()
    const [cv,setcv]=useState()
    const [exp,setexp]=useState()
   
    const [loading,setloading]=useState(false)
    const [success,setsuccess]=useState()
   
   
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
      console.log('total',total)
      console.log('from',from)
      console.log('to',to)
      console.log('vehicleid',vehicleid)
      console.log('userid',userid)
    const handlepayment=async (e)=>{
        e.preventDefault()
        setloading(true)
        setsuccess("yes")
        setTimeout(()=>{
            setloading(false)
            setsuccess('Payment done!!!!!!!!!')
            setname("")
            setcno("")
            setcv("")
            setexp("")
           
        },4000)
        try{
        const response=await axios.post('http://localhost:5000/Auth/payment',{vehicleid,total,from,to,userid})
        console.log(response.data)
        setPaymentDone(true)
        navigate('/bill')
        }catch(error){
            console.error('error',error)
            
        }
        
        
    }
    return(
        <div className="payment">
            <form className="payform" onSubmit={handlepayment}>
            
                <label className="pl">Name on Card</label>
                <input className="pi" type="text" value={name} onChange={(e)=>setname(e.target.value)} required/>
                <label className="pl">Card Number</label>
                <input className="pi" type="text" value={cno} onChange={(e)=>setcno(e.target.value)} required maxLength={16}/>
                <div className="pexp">
                    <div>
                <label className="pl">CV code</label>
                <input className="pi" type="text" value={cv} onChange={(e)=>setcv(e.target.value)} required maxLength={3}/>
                </div>
                <div>
                <label className="pl">Expiration</label>
                <div className="exp">
                <input className="pi" type="month" value={exp} onChange={(e)=>setexp(e.target.value)} placeholder="MM"  required/>
               
             
                </div></div></div>
                <div className="total">Your total:{total} </div>
                <button className="payb" type="submit" disabled={loading}>Pay</button>
                {loading &&(
             <div className="loading-container">
                <div className="loader"></div>
                <p>Payment processing.....</p>
                </div>)}
                {
                    !loading && setsuccess &&(
                        <div className="loading-container">
                            <p>{success}</p>
                        </div>
                    )
                }
            </form>

        </div>
    );
}
export default Payment;