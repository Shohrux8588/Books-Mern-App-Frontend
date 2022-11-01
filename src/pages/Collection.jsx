import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Typography,
  Container,
  Stack,
  Box,
  Chip,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";

import useUserContext from "./../hooks/useUserContext";
import LikeIcon from "./../components/Icons/LikeIcon";
import LikeOutlinedIcon from "./../components/Icons/LikeOutlinedIcon";
import { toLocaleDate } from "../utils/toLocaleDate";
import { fetchCollection } from "../store/actions/collectionsActions";
import { editCollection } from "./../store/actions/collectionsActions";
import { Fragment } from "react";
import { fetchBooks } from "./../store/actions/booksActions";

const Collection = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const state = useSelector((state) => state);
  const collectionsState = state.collections;
  const booksState = state.books;
  const userContext = useUserContext();

  useEffect(() => {
    dispatch(fetchCollection(id));
    dispatch(fetchBooks());
  }, [id, dispatch]);

  const {
    name,
    tags,
    updatedAt,
    comments,
    likes,
    _id,
    integerFields,
    stringFields,
    checkboxFields,
    multilineFields,
    dateFields,
    books,
  } = collectionsState.collection || {};

  const availableBooks =
    booksState.books &&
    books &&
    booksState.books.filter((book) => books.includes(book._id));

  const isUserLiked = likes && likes.includes(userContext.state._id);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editCollection(_id, userContext.state.token, {
        comments: [{ comment }, ...comments],
      })
    );
    setComment("");
  };

  return (
    <Container>
      <Typography
        color="primary"
        sx={{ textAlign: "center" }}
        variant="h3"
        gutterBottom
      >
        {name}
      </Typography>

      <Box>
        <Typography gutterBottom variant="body1" color="primary">
          TAGS
        </Typography>
        <Stack direction="row" spacing={1}>
          {tags && tags.map((tag) => <Chip label={tag} key={tag} />)}
        </Stack>
      </Box>

      <Box>
        {stringFields &&
          stringFields.map((field) => (
            <Fragment key={field.key}>
              <Typography gutterBottom variant="body1" color="primary">
                {field.key}
              </Typography>
              <Chip label={field.value} size="small" />
            </Fragment>
          ))}
        {integerFields &&
          integerFields.map((field) => (
            <Fragment key={field.key}>
              <Typography gutterBottom variant="body1" color="primary">
                {field.key}
              </Typography>
              <Chip label={field.value} size="small" />
            </Fragment>
          ))}
        {multilineFields &&
          multilineFields.map((field) => (
            <Fragment key={field.key}>
              <Typography gutterBottom variant="body1" color="primary">
                {field.key}
              </Typography>
              <Chip label={field.value} size="small" />
            </Fragment>
          ))}
        {dateFields &&
          dateFields.map((field) => (
            <Fragment key={field.key}>
              <Typography gutterBottom variant="body1" color="primary">
                {field.key}
              </Typography>
              <Chip label={toLocaleDate(field.value)} size="small" />
            </Fragment>
          ))}
        {checkboxFields &&
          checkboxFields.map((field) => (
            <Box key={field.key}>
              <Checkbox disabled checked={field.value} />
              {field.key}
            </Box>
          ))}
        {availableBooks &&
          availableBooks.map((book) => (
            <Typography variant="h4" gutterBottom key={book._id}>
              {book.name}
            </Typography>
          ))}
      </Box>
      <Box>
        <Typography gutterBottom variant="body1" color="primary">
          COMMENTS
        </Typography>
        <Stack direction="row" spacing={2}>
          {!comments && (
            <Typography gutterBottom variant="body2">
              Empty
            </Typography>
          )}
          {comments &&
            comments.map((comment) => (
              <Chip label={comment.comment} key={comment._id} size="small" />
            ))}
        </Stack>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="comment"
          label="Comment"
          variant="standard"
          value={comment}
          onChange={handleChange}
        />
        <Button
          type="submit"
          sx={{ display: "block", m: 1 }}
          variant="outlined"
        >
          ADD
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(5),
          left: (theme) => theme.spacing(5),
        }}
      >
        {isUserLiked ? <LikeIcon /> : <LikeOutlinedIcon />}
        {likes && likes.length}
      </Box>

      <Typography
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(5),
          right: (theme) => theme.spacing(5),
        }}
      >
        {toLocaleDate(updatedAt)}
      </Typography>
    </Container>
  );
};

export default Collection;
