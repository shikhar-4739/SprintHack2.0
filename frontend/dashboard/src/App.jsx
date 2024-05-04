import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Doctors from "./components/Doctors"
import AddNewDoctor from "./components/AddNewDoctor"
import SideBar from "./components/SideBar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main'
import axios from 'axios'
import "./App.css"

const App = () => {

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
        { withCredentials: true}
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated])

  return (
    <>
      <Router>
        <SideBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/addnew' element={<AddNewDoctor />} />
        </Routes>
        <ToastContainer position='top-center' />
      </Router>
    </>
  )
}

export default App
