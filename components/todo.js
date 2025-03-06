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
import SendIcon from "@mui/icons-material/Send";

const Todo = () => {
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const [errorInputTitle, setErrorInputTitle] = React.useState(false);
  const [errorInputStatus, setErrorInputStatus] = React.useState(false);
  const [errorInputDesc, setErrorInputDesc] = React.useState(false);
  const [errorInputType, setErrorInputType] = React.useState(false);
  const [errorInputPopup, setErrorInputPopup] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorSubmit, setIsErrorSubmit] = React.useState(false);
  const [isTaskExist, setIsTaskExist] = React.useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = React.useState(false);

  const validateField = (value) => value.trim() === "";

  const createNewTaskHandler = async (event) => {
    event.preventDefault();

    const isTitleInvalid = validateField(title);
    const isTypeInvalid = validateField(type);
    const isStatusInvalid = validateField(status);
    const isDescriptionInvalid = validateField(description);

    setErrorInputTitle(isTitleInvalid);
    setErrorInputType(isTypeInvalid);
    setErrorInputStatus(isStatusInvalid);
    setErrorInputDesc(isDescriptionInvalid);

    const isAnyFieldInvalid =
      isTitleInvalid ||
      isTypeInvalid ||
      isStatusInvalid ||
      isDescriptionInvalid;
    setErrorInputPopup(isAnyFieldInvalid);

    if (isAnyFieldInvalid) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          status,
          category: type,
          description,
        }),
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      if (!response.ok && response.status === 409) {
        setIsTaskExist(true);
        return;
      }
      if (!response.ok) {
        setIsErrorSubmit(true);
        return;
      }
      setIsSuccessSubmit(true);
      const data = await response.json();
      console.log("Task created successfully:", data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleClose = () => {
    setErrorInputPopup(false);
    setIsErrorSubmit(false);
    setIsSuccessSubmit(false);
    setIsTaskExist(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: { xs: 1, sm: 2 },
        margin: { xs: 1, sm: 2 },
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
                setErrorInputTitle(false);
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
                  setErrorInputType(false);
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
                  setErrorInputStatus(false);
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
                setErrorInputDesc(false);
              }}
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* <Button variant="contained" onClick={createNewTaskHandler}>
              Submit
            </Button> */}
            <Button
              size="small"
              onClick={createNewTaskHandler}
              endIcon={<SendIcon />}
              loading={isLoading}
              loadingPosition="end"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={errorInputPopup}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          Please fill out the required fields.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorSubmit}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          An error occured creating your task, please try again.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isTaskExist}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          Task already exist.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSuccessSubmit}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Task successfully created.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Todo;
