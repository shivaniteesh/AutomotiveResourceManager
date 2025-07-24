import React from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import UserDetails from './components/UserDetails';
import User from './components/User';
import Admin from './components/Admin';
import VehicleDetails from './components/vehicleDetails';
import Payment from './components/Payment';
import ForgotPassword from './components/ForgotPassword';
import Reset from './components/Reset';
import Bill from './components/Bill';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<AboutUs/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/unauthorized' element={<h1>unauthorized access</h1>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/UserDetails' element={<UserDetails/>}/>
     
      <Route path='/User' element={<User/>}/>
     <Route path='/bill' element={<Bill/>}/>

      <Route path='/admin' element={<Admin/>}/>
      <Route path='/vehicledetails' element={<VehicleDetails/>}/>
      <Route path='/Payment' element={<Payment/>}/>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
      <Route path='/Reset' element={<Reset/>}/>
    </Routes>
    </div>
  );
}

export default App;
