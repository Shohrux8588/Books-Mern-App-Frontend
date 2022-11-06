import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

import useUserContext from "./../../../hooks/useUserContext";
import { deleteBook, editBook } from "../../../store/actions/booksActions";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import CustomLink from "../../Link/CustomLink";

const Book = ({ name, _id, likes, loading, authorId }) => {
  const { t } = useTranslation();
  const userContext = useUserContext();
  const dispatch = useDispatch();
  const haveAccess =
    userContext.state._id === authorId || userContext.state.role === "admin";
  const isUser = !!userContext.state.token;

  const isUserLiked = likes && likes.includes(userContext.state._id);
  const handleLike = () => {
    if (isUserLiked) {
      likes = likes.filter((like) => like !== userContext.state._id);
    } else {
      likes.push(userContext.state._id);
    }
    dispatch(editBook(userContext.state.token, _id, { likes }));
  };

  const handleDelete = () => {
    dispatch(deleteBook(userContext.state.token, _id));
  };

  return (
    <ListItem key={_id}>
      <ListItemText
        primary={<CustomLink to={`/books/${_id}`}>{name}</CustomLink>}
      />
      {isUser && (
        <Stack edge="end" direction="row" spacing={1}>
          <Tooltip title={t("Icons.Like")}>
            <IconButton edge="end" aria-label="edit" onClick={handleLike}>
              {isUserLiked ? (
                <FavoriteIcon sx={{ color: pink[500] }} color="primary" />
              ) : (
                <FavoriteBorderIcon sx={{ color: pink[500] }} color="primary" />
              )}
              <Box component="span">{likes && likes.length}</Box>
            </IconButton>
          </Tooltip>
          {haveAccess && (
            <>
              <Tooltip title={t("Icons.Edit")}>
                <IconButton edge="end" aria-label="edit">
                  <CustomLink to={`edit/${_id}`}>
                    <EditIcon color="primary" />
                  </CustomLink>
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Icons.Delete")}>
                <IconButton edge="end" aria-label="delete">
                  <DeleteDialog loading={loading} handleDelete={handleDelete} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      )}
    </ListItem>
  );
};

export default Book;
