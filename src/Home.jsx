import React from "react";

import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Header from "./components/Header/Header.jsx";
import Login from "./pages/Login.jsx";
import Books from "./pages/Books.jsx";
import SignUp from "./pages/SignUp.jsx";

import { routes } from "./constants/routes.js";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Books />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.SIGNUP} element={<SignUp />} />
      </Routes>
    </Container>
  );
};

export default Home;
