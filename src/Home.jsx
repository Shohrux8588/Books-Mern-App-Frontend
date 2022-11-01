import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

import Header from "./components/Header/Header.jsx";
import Login from "./pages/Login.jsx";
import Main from "./pages/Main.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserContext from "./context/UserContext";
import SingleBook from "./pages/SingleBook.jsx";

import { routes } from "./constants/routes/routes.js";
import Books from "./pages/Books.jsx";
import CreateBook from "./pages/CreateBook.jsx";
import EditBook from "./pages/EditBook";
import Collections from "./pages/Collections.jsx";
import Collection from "./pages/Collection.jsx";
import CreateCollection from "./pages/CreateCollection.jsx";
import EditCollection from "./pages/EditCollection.jsx";
import Users from "./pages/Users.jsx";

const Home = () => {
  const { state } = useContext(UserContext);
  return (
    <Container>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Main />} />
        <Route
          path={routes.LOGIN}
          element={!!state.email ? <Navigate replace to={"/"} /> : <Login />}
        />
        <Route
          path={routes.SIGNUP}
          element={!!state.email ? <Navigate replace to={"/"} /> : <SignUp />}
        />
        <Route path={routes.BOOKS.HOME} element={<Books />} />
        <Route path={routes.BOOKS.EDIT} element={<EditBook />} />
        <Route path={routes.BOOKS.NEW} element={<CreateBook />} />
        <Route path={routes.BOOKS.SINGLE} element={<SingleBook />} />
        <Route path={routes.COLLECTIONS.HOME} element={<Collections />} />
        <Route path={routes.COLLECTIONS.SINGLE} element={<Collection />} />
        <Route path={routes.COLLECTIONS.NEW} element={<CreateCollection />} />
        <Route path={routes.COLLECTIONS.EDIT} element={<EditCollection />} />
        <Route path={routes.USERS.HOME} element={<Users/>}/>
      </Routes>
    </Container>
  );
};

export default Home;
