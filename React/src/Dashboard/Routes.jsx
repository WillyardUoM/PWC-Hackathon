import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Course from "./pages/Course";
import Academy from "../Academy/Academy";

const Rout = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistics" element={<Academy/>} />
            <Route path="/customers" element={<h1>Customers Page</h1>} />
            <Route path="/diagrams" element={<h1>Diagrams Page</h1>} />
        </Routes>
    );
};

export default Rout;