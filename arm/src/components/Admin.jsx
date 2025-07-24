import React,{useState,useEffect} from "react";
import '../styles/Admin.css'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import axios from "axios";

function Admin(){
    
    const [license,setlicense]=useState('')
    const [model,setmodel]=useState('')
    const [type,settype]=useState('Car')
    const [fueltype,setfueltype]=useState('')
    const [mileage,setmileage]=useState('')
    const [dailyrate,setdailyrate]=useState('')
    const [img,setimg]=useState(null)
    const [status,setstatus]=useState('')
    const navigate=useNavigate()
    const scroll=(id)=>{
        const element=document.getElementById(id)
        if(element){
            element.scrollIntoView({behavior:"smooth"})
        }
    }
    const handleimage=async (e)=>{
        const file=e.target.files[0]
      if(file){
            const fileReader=new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload=()=>{
                console.log(fileReader.result)
               setimg(fileReader.result)}
            }
            }

    const handleupload=async(img)=>{
        try{
           localStorage.getItem('license',license)
           
            await axios.post('http://localhost:5000/Auth/img',{
                img:img,license
            })

        }catch(error){
            console.error(error)
            
        }
    }
    const handle= async (e)=>{
        e.preventDefault()
         try{
                 
                    await axios.post('http://localhost:5000/Auth/vehicle', {
                       license,fueltype,mileage,model,type,dailyrate,
                    });
                    alert("vehicles details updated")
                    
                    
                    
                }catch(error){
                    console.log("Error registering vehicle",error)
                }
                setdailyrate(''
                )
                setmileage('')
                setfueltype('')
                setmodel('')
                setdailyrate('')
                settype('')
             setstatus('yes')
             setlicense('')
             localStorage.setItem('license',license)
             
                
            }
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
              console.log("email missing")
              return
            }
    
            const response=await axios.get('http://localhost:5000/Auth/admin', {withCredentials:true 
            })
            
            console.log(response.data)
            }catch(error){
                console.error("error",error);
                navigate('/login');
            };
            
        }
            
           fetchuser()
       
            
        }, [navigate]);
        const [vtrans,setvtrans]=useState([])
        const [utrans,setutrans]=useState([])
        
   useEffect(()=>{
    const fetchtransaction=async()=>{
        const response=await axios.get('http://localhost:5000/Auth/transaction')
        setvtrans(Array.isArray(response.data.vtrans)?response.data.vtrans:[])
        setutrans(Array.isArray(response.data.utrans)?response.data.utrans:[])
        console.log(response)
    }
    fetchtransaction()
   },[])
   const [issues,setissues]=useState([])
useEffect(()=>{
    const fetchissue=async()=>{
        try{
        const response=await axios.get('http://localhost:5000/Auth/issue')
        console.log(response)
        setissues(Array.isArray(response.data.issues) ? response.data.issues : []);
        console.log('issues',response.data)
        }catch(error){
            console.log('error',error)
        }
    }
    fetchissue()
},[])


   

    return(
       
        <div className="admin">
            <nav>
                
                <h2 className="nav" onClick={()=>scroll('users')}>Users</h2>
                <h2 className="nav" onClick={()=>scroll('vehicles')}>Vehicles</h2>
                <h2 className="nav" onClick={()=>scroll('car')}>Post Vehicle</h2>
                <h2 className="nav" onClick={()=>scroll('complaints')}>Complaints</h2>
                
            </nav>
            <section id="about">
                <h1>Hey chief Welcome to Dashboard..!</h1>
                <button onClick={handleLogout}>Logout</button>
            </section>
            
            <section id="users">
                <div className="t">
                <table className="atable">
                    <thead className="th">
                        <tr>
                            <th>Id</th>
                        <th className="ti">Transaction ids:</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {utrans.map((e)=>(
                            <tr key={e.id} >
                                <td>{e._id}</td>
                                
                                <td>{e.transactionid}</td>
                            </tr>
                        ))}
                    </tbody>

                </table></div>
            </section>
            <section id="vehicles">
            <div className="t">
                <table className="atable">
                    <thead className="th">
                        <tr>
                        <th>vehicle id</th>
                        <th className="ti">Transaction ids:</th>
                       
                        </tr>
                    </thead>
                    <tbody>
                    {vtrans.map((e)=>(
                            <tr key={e.id} >
                                <td>{e._id}</td>
                               
                                <td>{e.transactionid}</td>
                               
                            </tr>
                        ))}
                    </tbody>

                </table></div>
            </section>
            <section id="car">
                <div className="stats">
                
            <div className="userdetails">
                <form onSubmit={handle}>
                <label className="ulabel">Type</label>
                <select type="text" className="uinput"  onChange={(e)=>settype(e.target.value)}>
                    <option value="Bike">Bike</option>
                    <option value="Car">Car</option>
                    </select>   
                <label className="ulabel">License Plate</label>
                <input type="text" className="uinput"  value={license} onChange={(e)=>setlicense(e.target.value)} required/>
                <label className="ulabel">Model</label>
                <input type="text" className="uinput" value={model} onChange={(e)=>setmodel(e.target.value)} required/>
                <label className="ulabel">Fuel Type</label>
                <input type="text" className="uinput" value={fueltype} onChange={(e)=>setfueltype(e.target.value)} required/>
                    
                    <label className="ulabel">Daily Rate</label>
                    <input type="text" className="uinput" value={dailyrate} onChange={(e)=>setdailyrate(e.target.value)} required/>
                     <label className="ulabel">Mileage</label>
                    <input type="text" className="uinput" value={mileage} onChange={(e)=>setmileage(e.target.value)} required/>
                  
                    
                    <button type="submit" className="ubutton">Submit</button>
                    </form>
                 {/*status && (
                        <div className="userdetails">
                            <label className="ulabel">Photo</label>
                <input type="file" className="uinput"  onChange={handleimage} required/>
                <label className='ulabel'>License plate</label>
                <button onClick={handleupload} className="ubutton">Submit</button>
                        </div>
                    )*/}


        </div>
                </div>
            </section>
            <section id="complaints">
            <div className="t">
                <table className="atable">
                    <thead>
                        <tr>
                        <th>Transaction id</th>
                        <th>Vehicle License plate</th>
                        <th className="ti">Issue:</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    { issues.map((e)=>(
                            <tr key={e.id} >
                                <td>{e.paymentid}</td>
                                <td>{e.license}</td>
                                <td>{e.issue}</td>
                            </tr>
                        ))}
                    </tbody>

                </table></div>
            </section>
        </div>
    );
}
export default Admin;
