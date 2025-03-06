"use client";
import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Todo = () => {
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [errorInputTitle, setErrorInputTitle] = React.useState(false);
  const [errorInputStatus, setErrorInputStatus] = React.useState(false);
  const [errorInputDesc, setErrorInputDesc] = React.useState(false);
  const [errorInputType, setErrorInputType] = React.useState(false);
  const [errorPopup, setErrorPopup] = React.useState(false);

  const validateField = (value, setError) => {
    setError(value.trim() === "");
  };

  const submitHandler = () => {
    validateField(title, setErrorInputTitle);
    validateField(type, setErrorInputType);
    validateField(status, setErrorInputStatus);
    validateField(description, setErrorInputDesc);
    setErrorPopup(!title || !type || !status || !description);
  };

  const handleClose = () => {
    setErrorPopup(false);
  };

  return (
    <Container
      maxWidth="sm" // Change to a smaller breakpoint like "sm"
      sx={{
        mt: 3, // Slightly reduce margin-top
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: { xs: 1, sm: 2 }, // Use responsive padding
        margin: { xs: 1, sm: 2 }, // Use responsive margin
      }}
    >
      <Box component="form">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              size="small"
              required
              label="Task Title"
              variant="filled"
              fullWidth
              error={errorInputTitle}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                validateField(e.target.value, setErrorInputTitle);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="priority-select-filled-label">
                Priority *
              </InputLabel>
              <Select
                size="small"
                required
                labelId="priority-select-filled-label"
                id="priority-select-filled"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  validateField(e.target.value, setErrorInputType);
                }}
                error={errorInputType}
              >
                <MenuItem value={"P1"}>High</MenuItem>
                <MenuItem value={"P2"}>Medium</MenuItem>
                <MenuItem value={"P3"}>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="status-select-filled-label">Status *</InputLabel>
              <Select
                size="small"
                required
                labelId="status-select-filled-label"
                id="status-select-filled"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  validateField(e.target.value, setErrorInputStatus);
                }}
                error={errorInputStatus}
              >
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              size="small"
              required
              label="Description"
              multiline
              rows={2}
              variant="filled"
              fullWidth
              error={errorInputDesc}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                validateField(e.target.value, setErrorInputDesc);
              }}
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button variant="contained" onClick={submitHandler}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={errorPopup} autoHideDuration={5000} onClose={handleClose}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          Please fill out the required fields.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Todo;
