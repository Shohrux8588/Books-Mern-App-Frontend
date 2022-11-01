import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

import useUserContext from "../hooks/useUserContext";
import { createBook } from "../store/actions/booksActions";

const CreateBook = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booksState = useSelector((state) => state.books);
  const userContext = useUserContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState(["adventure"]);
  const [currValue, setCurrValue] = useState("");

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
      createBook(userContext.state.token, {
        authorId: userContext.state._id,
        name,
        description,
        tags,
        likes: [],
        comments: [],
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
        {t("Books.CreateBook")}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <div className={"container"}>
            {tags.map((item, index) => (
              <Chip
                size="small"
                onDelete={() => handleDelete(item, index)}
                label={item}
                key={item}
              />
            ))}
          </div>
          <TextField
            value={currValue}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
            variant="outlined"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("Books.Buttons.Create")}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBook;
