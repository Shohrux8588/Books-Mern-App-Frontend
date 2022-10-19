import React, { useState } from "react";

import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  Select,
  MenuItem,
  Grid,
  Tooltip,
  Zoom,
  Box,
  Typography,
} from "@mui/material";

import ukFlagPng from "../../../constants/flags/uk.png";
import uzFlagPng from "../../../constants/flags/uz.png";

const ChangeLanguage = () => {
  const { t } = useTranslation();
  const [openTooltip, setOpenTooltip] = useState(false);

  return (
    <Grid item xs={6} sx={{ textAlign: "center" }}>
      <Tooltip
        title={t("Tooltip.Language")}
        placement="left-end"
        arrow
        open={openTooltip}
        color="primary"
        TransitionComponent={Zoom}
      >
        <Select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          sx={{
            minWidth: 120,
            height: 40,
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          onMouseEnter={() => setOpenTooltip(true)}
          onMouseLeave={() => setOpenTooltip(false)}
          onClick={() => setOpenTooltip(false)}
        >
          <MenuItem value="en">
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Grid item xs={6}>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    maxWidth: "40px",
                  }}
                  alt="The house from the offer."
                  src={ukFlagPng}
                />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Typography
                  variant="body1"
                  sx={{ display: "inline-block", textAlign: "center" }}
                >
                  En
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
          <MenuItem value="uz">
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Grid item xs={6}>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    maxWidth: "40px",
                  }}
                  alt="The house from the offer."
                  src={uzFlagPng}
                />{" "}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Typography
                  variant="body1"
                  sx={{ display: "inline-block", textAlign: "center" }}
                >
                  Uz
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
        </Select>
      </Tooltip>
    </Grid>
  );
};

export default ChangeLanguage;
