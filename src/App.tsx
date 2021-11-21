import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Private from './pages/Private'

import Nav from "./components/Nav"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav/>
                <main className="form-signin">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/private" element={<Private/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App
