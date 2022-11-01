import React, { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

const BookForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        SUBMIT
      </Button>
    </Box>
  );
};

export default BookForm;
