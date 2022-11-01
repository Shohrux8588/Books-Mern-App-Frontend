import * as React from "react";

import { TextField } from "@mui/material";

const DateField = ({ id, name, value, onChange }) => {
  return (
    <TextField
      id={`${id}`}
      name={name}
      defaultValue={value}
      fullWidth
      onChange={onChange}
      type="date"
    />
  );
};

export default DateField;
