import Navbar from "../components/Navbar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <>
      <div className="main-section">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
