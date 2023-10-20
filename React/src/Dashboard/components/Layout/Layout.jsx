import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { SLayout, SMain } from "./styles";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Academy from "../../../Academy/Academy";


const Layout = ({ }) => {
  return (
    <SLayout>
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/statistics" element={<Academy />} />
        <Route path="/customers" element={<h1>Customers Page</h1>} />
        <Route path="/diagrams" element={<h1>Diagrams Page</h1>} />
      </Routes>
    </SLayout>
  );
};

export default Layout;
