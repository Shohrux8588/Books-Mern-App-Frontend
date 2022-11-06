import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Fab,
  Tooltip,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchCollections } from "./../store/actions/collectionsActions";
import Collection from "./../components/Collections/Collection/Collection";
import CustomLink from "../components/Link/CustomLink";

const Collections = () => {
  const { t } = useTranslation();
  const collectionsState = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections());
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
        variant="h4"
        gutterBottom
      >
        {t("Sections.Collections")}
      </Typography>
      <List sx={{ width: 1000, maxWidth: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <Tooltip title={t("Button.AddCollection")}>
            <ListItemText
              sx={{ textAlign: "center" }}
              primary={
                <CustomLink to="/collections/new">
                  <Fab color="secondary">
                    <AddIcon />
                  </Fab>
                </CustomLink>
              }
            />
          </Tooltip>
        </ListItem>
        {collectionsState.collections &&
          collectionsState.collections.map((collection) => (
            <Fragment key={collection._id}>
              {" "}
              <Collection {...collection} loading={collectionsState.loading} />
              <Divider />
            </Fragment>
          ))}
      </List>
    </Grid>
  );
};

export default Collections;
