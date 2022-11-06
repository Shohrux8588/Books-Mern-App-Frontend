import React from "react";

import { Grid, Typography } from "@mui/material";

import ChangeLanguage from "./components/ChangeLanguage.jsx";
import ToggleTheme from "./components/ToggleTheme.jsx";
import CustomMenu from "./components/CustomMenu";
import CustomLink from "../Link/CustomLink.jsx";

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
        <CustomLink to="/">
          <Typography color="primary" variant="h4">
            MENU
          </Typography>
        </CustomLink>
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
