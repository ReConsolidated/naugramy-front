// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Level from "./components/Level";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
                <h1 className="text-3xl font-bold mb-6">Gamified Learning Platform</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/levels/:levelId" element={<Level />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
