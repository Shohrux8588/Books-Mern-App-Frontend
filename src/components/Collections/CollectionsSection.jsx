import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Divider, List, Typography, Grid } from "@mui/material";

import Collection from "./Collection/Collection";

import { fetchCollections } from "../../store/actions/collectionsActions";
import CustomLink from "../Link/CustomLink";

const CollectionsSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const collectionsState = useSelector((state) => state.collections);

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
        variant="h4"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        <CustomLink to="/collections">{t("Sections.Collections")}</CustomLink>
      </Typography>
      <List sx={{ width: 1000, maxWidth: "100%", bgcolor: "background.paper" }}>
        {collectionsState.collections &&
          collectionsState.collections.slice(0, 5).map((collection) => (
            <Fragment key={collection._id}>
              <Collection {...collection} loading={collectionsState.loading} />
              <Divider />
            </Fragment>
          ))}
      </List>
    </Grid>
  );
};

export default CollectionsSection;
