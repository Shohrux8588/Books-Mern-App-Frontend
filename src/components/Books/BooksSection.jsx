import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { List, Divider, Typography, Grid, Box } from "@mui/material";

import Book from "./Book/Book";

import { fetchBooks } from "../../store/actions/booksActions";
import CustomLink from "../Link/CustomLink";

const BooksSection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const booksState = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        color="primary"
        sx={{ textAlign: "center" }}
        variant="h4"
        gutterBottom
      >
        <CustomLink to="/books">{t("Sections.Books")}</CustomLink>
      </Typography>

      <List sx={{ width: 1000, maxWidth: "100%", bgcolor: "background.paper" }}>
        {booksState.books &&
          booksState.books.slice(0, 5).map((book) => (
            <Box component="div" key={book._id}>
              {" "}
              <Book {...book} loading={booksState.loading} />
              <Divider />
            </Box>
          ))}
      </List>
    </Grid>
  );
};

export default BooksSection;
