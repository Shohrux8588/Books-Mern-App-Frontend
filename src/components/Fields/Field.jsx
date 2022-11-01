import React from "react";

import { TextField } from "@mui/material";

const Field = ({ id, name, label, value, onChange, type = "text" }) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={`${id}`}
      name={name}
      required
      value={value}
      label={label}
      onChange={onChange}
      type={type}
    />
  );
};

export default Field;
