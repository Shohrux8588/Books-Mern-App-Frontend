import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import useUserContext from "./../../../hooks/useUserContext";
import {
  deleteCollection,
  editCollection,
} from "./../../../store/actions/collectionsActions";
import LikeIcon from "./../../Icons/LikeIcon";
import LikeOutlinedIcon from "./../../Icons/LikeOutlinedIcon";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import CustomLink from "../../Link/CustomLink";

const Collection = ({ name, _id, likes, authorId, loading }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userContext = useUserContext();
  const userId = userContext.state._id;

  const haveAccess =
    userContext.state._id === authorId || userContext.state.role === "admin";
  const isUser = !!userContext.state.token;

  const isUserLiked = likes.includes(userId);
  const handleLike = () => {
    let updatedLikes = [...likes];
    if (isUserLiked) {
      updatedLikes = updatedLikes.filter((id) => id !== userId);
    } else {
      updatedLikes.push(userId);
    }
    dispatch(
      editCollection(_id, userContext.state.token, { likes: updatedLikes })
    );
  };

  const handleDelete = () => {
    dispatch(deleteCollection(userContext.state.token, _id));
  };

  return (
    <ListItem key={_id}>
      <ListItemText
        primary={<CustomLink to={`/collections/${_id}`}>{name}</CustomLink>}
      />

      {isUser && (
        <Stack edge="end" direction="row" spacing={1}>
          <Tooltip title={t("Icons.Like")}>
            <IconButton edge="end" aria-label="like" onClick={handleLike}>
              {isUserLiked ? <LikeIcon /> : <LikeOutlinedIcon />}
              <Box component="span">{likes.length}</Box>
            </IconButton>
          </Tooltip>
          {haveAccess && (
            <>
              <Tooltip title={t("Icons.Edit")}>
                <IconButton edge="end" aria-label="edit">
                  <CustomLink to={`/collections/edit/${_id}`}>
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

export default Collection;
