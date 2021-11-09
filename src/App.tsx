import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home"
import Register from "./pages/Register";
import Nav from "./components/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";

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
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
