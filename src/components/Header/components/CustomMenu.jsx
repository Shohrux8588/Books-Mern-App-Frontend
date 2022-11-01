import React, { useState, Fragment } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import BookIcon from "@mui/icons-material/Book";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import CustomLink from "./../../Link/CustomLink";
import useUserContext from "./../../../hooks/useUserContext";

const CustomMenu = () => {
  const { t } = useTranslation();
  const userContext = useUserContext();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    userContext.logout();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {!!userContext.state.email ? (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={userContext.state.email} />
            </ListItemButton>
          </ListItem>
        ) : (
          <CustomLink to="/login">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={t("Menu.Login")} />
              </ListItemButton>
            </ListItem>
          </CustomLink>
        )}
        {userContext.state.email && (
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={t("Menu.Logout")} />
            </ListItemButton>
          </ListItem>
        )}
        <Divider />
        <CustomLink to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t("Menu.Home")} />
            </ListItemButton>
          </ListItem>
        </CustomLink>
        <CustomLink to="/users">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={t("Menu.Users")} />
            </ListItemButton>
          </ListItem>
        </CustomLink>
        <CustomLink to="/books">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={t("Menu.Books")} />
            </ListItemButton>
          </ListItem>
        </CustomLink>
        <CustomLink to="/collections">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CollectionsBookmarkIcon />
              </ListItemIcon>
              <ListItemText primary={t("Menu.Collections")} />
            </ListItemButton>
          </ListItem>
        </CustomLink>
      </List>
    </Box>
  );

  return (
    <Fragment key="left">
      <Button onClick={toggleDrawer("left", true)}>
        {" "}
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </Fragment>
  );
};

export default CustomMenu;
