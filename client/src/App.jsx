import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { Toaster } from 'react-hot-toast';
import AdminL from './Layouts/AdminL';
import UserL from './Layouts/UserL';
import PublicL from './Layouts/PublicL';

export default function App() {
  return (
    <>
         <Router>
         <Toaster/>
          <Routes>
            <Route path='/' element={<UserL/>}>
            <Route index element={<Home/>}/>
            </Route>
            <Route path='/admin' element={<AdminL/>}>
            <Route index  element={<Admin/>}/>
            </Route>
            <Route path='/' element={<PublicL/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            </Route>
            
          </Routes>
         </Router>



    </>
  )
}
