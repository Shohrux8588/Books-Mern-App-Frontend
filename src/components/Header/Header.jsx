import React from "react";
import { Link } from "react-router-dom";

import { Grid, Typography } from "@mui/material";

import ChangeLanguage from "./components/ChangeLanguage.jsx";
import ToggleTheme from "./components/ToggleTheme.jsx";
import CustomMenu from "./components/CustomMenu";

const Header = () => {
  return (
    <Grid mt={1} container sx={{ justifyContent: "center" }}>
      <Grid
        item
        xs={6}
        sm={8}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <CustomMenu />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography color="primary" variant="h4">
            MENU
          </Typography>
        </Link>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        item
        xs={6}
        sm={4}
      >
        <ChangeLanguage />
        <ToggleTheme />
      </Grid>
    </Grid>
  );
};

export default Header;
