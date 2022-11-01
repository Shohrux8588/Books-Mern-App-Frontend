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
} from "@mui/material";

import { editBook, fetchBook } from "./../store/actions/booksActions";
import useUserContext from "./../hooks/useUserContext";
import LikeIcon from "./../components/Icons/LikeIcon";
import LikeOutlinedIcon from "./../components/Icons/LikeOutlinedIcon";
import { toLocaleDate } from "../utils/toLocaleDate";

const SingleBook = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const booksState = useSelector((state) => state.books);
  const userContext = useUserContext();
  const isUser = !!userContext.state.token;

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [id, dispatch]);

  const { name, description, tags, updatedAt, comments, likes, _id } =
    booksState.book;

  const isUserLiked = likes && likes.includes(userContext.state._id);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editBook(userContext.state.token, _id, {
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
      <Typography gutterBottom variant="body1" color="primary">
        DESCRIPTION
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {description}
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
      {isUser && (
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
      )}
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

export default SingleBook;
