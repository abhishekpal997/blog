import React from 'react'
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/Login';
import Admindashboard from './Pages/Admin/Admindashboard';
import Userdashboard from './Pages/User/Userdashboard';
import Register from './Pages/Login/Register';
import UserLayout from './Pages/User/Layout/UserLayout';
import AdminLayout from './Pages/Admin/Layouts/AdminLayout';
import AllCategory from './Pages/Admin/AllCategory';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/*' element={<UserLayout />} >
            <Route path='dashboard' element={<Userdashboard />} />
          </Route>
          <Route path='/admin/*' element={<AdminLayout />} >
            <Route path='dashboard' element={<Admindashboard />} />
            <Route path='all-category' element={<AllCategory />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;