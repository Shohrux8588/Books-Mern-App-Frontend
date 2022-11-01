import React from "react";

import { Container } from "@mui/material";

import BooksSection from "../components/Books/BooksSection";
import UsersSection from "../components/Users/UsersSection";
import CollectionsSection from "../components/Collections/CollectionsSection";
import useUserContext from "./../hooks/useUserContext";

const Main = () => {
  const useContext = useUserContext();
  console.log(useContext);
  return (
    <Container>
      {useContext.state.role === "admin" && <UsersSection />}
      <BooksSection />
      <CollectionsSection />
    </Container>
  );
};

export default Main;
