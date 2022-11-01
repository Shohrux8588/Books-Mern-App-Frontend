import React from "react";

import { useTheme } from "@mui/material/styles";
import { IconButton, Grid, Tooltip, Zoom } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTranslation } from "react-i18next";

import useThemeContext from "../../../hooks/useThemeContext.jsx";

const ToggleTheme = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const themeContext = useThemeContext();

  return (
    <Grid item xs={4} sx={{ textAlign: "center" }}>
      <Tooltip
        title={t("Tooltip.Theme")}
        TransitionComponent={Zoom}
        arrow
        placement="bottom-end"
      >
        <IconButton onClick={themeContext.toggleColorMode} color="inherit">
          {theme.palette.mode === "light" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default ToggleTheme;
