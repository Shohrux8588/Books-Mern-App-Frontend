import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import DeleteIcon from "@mui/icons-material/Delete";

const DeleteDialog = ({ handleDelete, loading }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        component="span"
        sx={{ display: "inline-block" }}
        onClick={handleClickOpen}
      >
        <DeleteIcon color="error" />
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle color="primary" id="responsive-dialog-title">
          {"DELETE"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this collection?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
