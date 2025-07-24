import { Navigate,Outlet } from "react-router-dom";
const ProtectedRoute=({allowedRoles})=>{
    const token=localStorage.getItem('token')
    if(!token) return <Navigate to="/login"/>
    try{
        const user=JSON.parse(atob(token.split(".")[1]))
        if(allowedRoles && !allowedRoles.includes(user.role)){
            return <Navigate to="/unauthorized"/>
        }
            return <Outlet/>
    }catch(error){
        console.log("invalid token",error)
        return <Navigate to="/login"/>
    }
}
export default ProtectedRoute