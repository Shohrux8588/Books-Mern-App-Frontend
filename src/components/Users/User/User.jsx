import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";

import BlockIcon from "@mui/icons-material/Block";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import useUserContext from "./../../../hooks/useUserContext";
import { deleteUser } from "../../../store/actions/usersActions";
import { editUser } from "./../../../store/actions/usersActions";
import DeleteBookDialog from "./../../DeleteDialog/DeleteBookDialog";

const User = ({ email, role, blocked, _id, loading }) => {
  const { t } = useTranslation();
  const userCtx = useUserContext();
  const token = userCtx.state.token;
  const userRole = userCtx.state.role;
  const dispatch = useDispatch();

  const haveAccess = userCtx.state.role === "admin";

  const handleRoleChange = () => {
    dispatch(
      editUser(token, userRole, _id, {
        role: role === "admin" ? "user" : "admin",
      })
    );
  };

  const handleBlock = () => {
    dispatch(editUser(token, userRole, _id, { blocked: !blocked }));
  };

  const handleDelete = () => {
    dispatch(deleteUser(token, userRole, _id));
  };

  return (
    <ListItem key={_id}>
      <ListItemText primary={email} />
      {haveAccess && (
        <Stack direction="row" spacing={1}>
          <Tooltip
            title={role === "admin" ? t("Icons.Admin") : t("Icons.User")}
          >
            <IconButton onClick={handleRoleChange}>
              {role === "admin" ? <AdminPanelSettingsIcon /> : <PersonIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={blocked ? t("Icons.Blocked") : t("Icons.Active")}>
            <IconButton onClick={handleBlock}>
              {blocked ? <BlockIcon /> : <CheckCircleOutlineIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Icons.Delete")}>
            <IconButton>
              {" "}
              <DeleteBookDialog handleDelete={handleDelete} loading={loading} />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </ListItem>
  );
};

export default User;
