import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components/index";
import { Post, Login, Register, Reset } from "./pages/index";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
