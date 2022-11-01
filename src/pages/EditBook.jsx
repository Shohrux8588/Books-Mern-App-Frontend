import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  TextField,
  Box,
  Button,
  FormControl,
  Chip,
  Container,
  Typography,
} from "@mui/material";

import useUserContext from "./../hooks/useUserContext";
import { editBook } from "./../store/actions/booksActions";
import { fetchBook } from "./../store/actions/booksActions";

const EditBook = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const booksState = useSelector((state) => state.books);
  const userContext = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const [tags, setTags] = useState([]);
  const [currValue, setCurrValue] = useState("");

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (booksState.book.name) {
      setName(booksState.book.name);
      setDescription(booksState.book.description);
      setTags(booksState.book.tags);
    }
  }, [booksState.book]);

  const handleKeyUp = (e) => {
    if (e.keyCode === 32) {
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...tags];
    arr.splice(index, 1);
    setTags(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editBook(userContext.state.token, booksState.book._id, {
        authorId: booksState.book.authorId,
        name,
        description,
        tags,
        likes: booksState.book.likes,
        comments: booksState.book.comments,
      })
    );
    if (!booksState.error && !booksState.loading) {
      navigate("/books");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        color="primary"
        sx={{ textAlign: "center" }}
        variant="h3"
        gutterBottom
      >
        {t("Books.EditBook")}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="bookName"
          margin="normal"
          required
          fullWidth
          id="bookName"
          label="Name"
          autoComplete="bookName"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="bookDescription"
          margin="normal"
          required
          fullWidth
          id="bookDescription"
          label="Description"
          autoComplete="bookDescription"
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <Box component="div">
            {tags &&
              tags.map((item, index) => (
                <Chip
                  size="small"
                  onDelete={() => handleDelete(item, index)}
                  label={item}
                  key={item}
                />
              ))}
          </Box>
          <TextField
            value={currValue}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("Books.Buttons.Edit")}
        </Button>
      </Box>
    </Container>
  );
};

export default EditBook;
