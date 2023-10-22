import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
