import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, List, Divider, Grid } from "@mui/material";

import User from "./../components/Users/User/User";
import { fetchUsers } from "./../store/actions/usersActions";

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
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
        {t("Sections.Users")}
      </Typography>
      <List sx={{ width: 1000, maxWidth: "100%", bgcolor: "background.paper" }}>
        {usersState.users &&
          usersState.users.map((user) => (
            <Fragment key={user._id}>
              {" "}
              <User {...user} loading={usersState.loading} />
              <Divider />
            </Fragment>
          ))}
      </List>
    </Grid>
  );
};

export default Users;
