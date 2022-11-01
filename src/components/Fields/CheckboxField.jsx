import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxField = ({ id, name, label, value, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={`${id}`}
          name={name}
          checked={value}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};

export default CheckboxField;
