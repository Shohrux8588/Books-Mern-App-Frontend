import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Typography,
  List,
  Divider,
  ListItem,
  ListItemText,
  Tooltip,
  Fab,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Book from "../components/Books/Book/Book";
import { fetchBooks } from "./../store/actions/booksActions";
import useUserContext from "./../hooks/useUserContext";
import CustomLink from "../components/Link/CustomLink";
const Books = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const booksState = useSelector((state) => state.books);
  const userContext = useUserContext();
  const isUser = !!userContext.state.token;

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
        sx={{ textAlign: "center", margin: "auto", padding: "auto" }}
        variant="h3"
        gutterBottom
      >
        {t("Sections.Books")}
      </Typography>
      <List sx={{ width: 1000, maxWidth: "100%", bgcolor: "background.paper" }}>
        {isUser && (
          <ListItem>
            <Tooltip title={t("Button.AddBook")}>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={
                  <CustomLink to="/books/new">
                    <Fab color="secondary">
                      <AddIcon />
                    </Fab>
                  </CustomLink>
                }
              />
            </Tooltip>
          </ListItem>
        )}
        {booksState.books &&
          booksState.books.map((book) => (
            <Fragment key={book._id}>
              {" "}
              <Book {...book} loading={booksState.loading} />
              <Divider />
            </Fragment>
          ))}
      </List>
    </Grid>
  );
};

export default Books;
