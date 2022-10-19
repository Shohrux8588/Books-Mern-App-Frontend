import React from "react";

import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ChangeLanguage from "./components/ChangeLanguage.jsx";
import ToggleTheme from "./components/ToggleTheme.jsx";

const Header = () => {
  const { t } = useTranslation();
  return (
    <Grid mt={1} container sx={{ justifyContent: "center" }}>
      <Grid item xs={7}>
        <Typography variant="h3">{t("MainTitle")}</Typography>
      </Grid>
      <Grid
        container
        item
        xs={5}
        sx={{
          alignItems: "center",
          justifyContext: "center",
          direction: "row",
        }}
      >
        <ChangeLanguage />
        <ToggleTheme />
      </Grid>
    </Grid>
  );
};

export default Header;
