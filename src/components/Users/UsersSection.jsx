import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { List, Divider, Typography, Grid } from "@mui/material";

import User from "./User/User";

import { fetchUsers } from "../../store/actions/usersActions";
import CustomLink from "../Link/CustomLink";

const UsersSection = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const usersState = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(5));
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
        <CustomLink to="/users">{t("Sections.Users")}</CustomLink>
      </Typography>
      <List sx={{ width: 1000, maxWidth: "100%", bgcolor: "background.paper" }}>
        {usersState.users &&
          usersState.users.slice(0, 5).map((user) => (
            <Fragment key={user._id}>
              <User key={user._id} {...user} loading={usersState.loading} />
              <Divider />
            </Fragment>
          ))}
      </List>
    </Grid>
  );
};

export default UsersSection;
