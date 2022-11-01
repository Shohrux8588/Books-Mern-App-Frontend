import React from "react";

import { Container } from "@mui/material";

import BooksSection from "../components/Books/BooksSection";
import UsersSection from "../components/Users/UsersSection";
import CollectionsSection from "../components/Collections/CollectionsSection";

const Main = () => {
  return (
    <Container>
      <UsersSection />
      <BooksSection />
      <CollectionsSection />
    </Container>
  );
};

export default Main;
