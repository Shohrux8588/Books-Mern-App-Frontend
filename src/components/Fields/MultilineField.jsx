import React from "react";

import { TextField } from "@mui/material";

const MultilineField = ({ id, name, label, value, onChange }) => {
  return (
    <TextField
      id={`${id}`}
      name={name}
      label={label}
      multiline
      maxRows={4}
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
};

export default MultilineField;
