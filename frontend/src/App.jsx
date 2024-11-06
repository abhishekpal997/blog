import React from 'react'
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Login/Register';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/*' >
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/admin/*' >
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;