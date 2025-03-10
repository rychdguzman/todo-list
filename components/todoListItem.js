import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTasks } from "@/TaskProvider/TaskContetxt";

const TodoListItem = ({ data }) => {
  const { updateTaskStatus, deleteTask, fetchTasks } = useTasks();

  const [isLoadingPending, setIsLoadingPending] = React.useState(false);
  const [isLoadingDone, setIsLoadingDone] = React.useState(false);
  const [isLoadingInProgress, setIsLoadingInProgress] = React.useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = React.useState(false);
  const [isLoadingRemoveInProgress, setIsLoadingRemoveInProgress] =
    React.useState(false);
  const [isLoadingRemovePending, setIsLoadingRemovePending] =
    React.useState(false);

  const [isError, setIsError] = React.useState(false);
  const [isErrorRemove, setIsErrorRemove] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isSuccessRemove, setIsSuccessRemove] = React.useState(false);

  const categoryIdentifier = (category) => {
    const categoryMap = {
      P1: "HIGH",
      P2: "MEDIUM",
      P3: "LOW",
    };

    return categoryMap[category] || "";
  };

  const categoryWeight = (category) => {
    const categoryMap = {
      P1: "error",
      P2: "warning",
      P3: "success",
    };

    return categoryMap[category] || "";
  };

  const updateTaskHandler = async (id, status) => {
    if (!id || !status) {
      console.error("Invalid task ID or status provided.");
      return; // Exit early if parameters are invalid
    }

    // Map statuses to their respective loading state setters
    const loadingSetters = {
      Pending: setIsLoadingPending,
      Done: setIsLoadingDone,
      "In Progress": setIsLoadingInProgress,
    };

    const setLoading = loadingSetters[status];

    try {
      // Set loading state
      if (setLoading) setLoading(true);

      // Await the update operation
      const updateResult = await updateTaskStatus(id, status);

      // Handle failure
      if (!updateResult.ok) {
        return setIsError(true); // Set error state
      }

      // Handle success
      setIsSuccess(true);

      // Refresh the task list
      await fetchTasks();
    } catch (error) {
      setIsError(true); // Set error state
      console.error(
        "Error occurred while updating task:",
        error.message || error
      );
    } finally {
      // Ensure loading state is reset no matter what
      if (setLoading) setLoading(false);
    }
  };

  const deleteTaskHandler = async (id, status) => {
    if (!id || !status) {
      console.error("Task ID and status are required to delete a task.");
      return; // Exit early if `id` or `status` is not provided
    }

    // Map statuses to their respective loading state setters
    const loadingSetters = {
      Pending: setIsLoadingRemovePending,
      Done: setIsLoadingRemove,
      "In Progress": setIsLoadingRemoveInProgress,
    };

    const setLoading = loadingSetters[status];

    try {
      // Set loading state
      if (setLoading) setLoading(true);

      // Await the delete operation
      const deleteResult = await deleteTask(id);

      // Handle failure
      if (!deleteResult.ok) {
        return setIsError(true); // Set error state
      }

      // Handle success
      setIsSuccessRemove(true);

      // Refresh the task list
      await fetchTasks();
    } catch (error) {
      setIsErrorRemove(true);
      console.error(
        "Error occurred while deleting task:",
        error.message || error
      );
    } finally {
      // Ensure loading state is reset no matter what
      if (setLoading) setLoading(false);
    }
  };

  const handleClose = () => {
    // Close all the informative popup
    setIsError(false);
    setIsErrorRemove(false);
    setIsSuccess(false);
    setIsSuccessRemove(false);
  };

  const actionList = (status, id) => {
    const statusMap = {
      "In Progress": (
        <>
          <Button
            size="small"
            loading={isLoadingPending}
            loadingPosition="end"
            variant="contained"
            onClick={() => updateTaskHandler(id, "Pending")}
          >
            Mark as Pending
          </Button>
          <Button
            size="small"
            loading={isLoadingDone}
            loadingPosition="end"
            variant="contained"
            onClick={() => updateTaskHandler(id, "Done")}
          >
            Mark as Done
          </Button>
          <Button
            size="small"
            loading={isLoadingRemoveInProgress}
            loadingPosition="end"
            variant="outlined"
            color="primary"
            onClick={() => deleteTaskHandler(id, "In progress")}
          >
            Remove Task
          </Button>
        </>
      ),
      Done: (
        <>
          <Button
            size="small"
            loading={isLoadingRemove}
            loadingPosition="end"
            variant="outlined"
            color="primary"
            onClick={() => deleteTaskHandler(id, "Done")}
          >
            Remove Task
          </Button>
        </>
      ),
      Pending: (
        <>
          <Button
            size="small"
            loading={isLoadingInProgress}
            loadingPosition="end"
            variant="contained"
            onClick={() => updateTaskHandler(id, "In Progress")}
          >
            Start Task
          </Button>
          <Button
            size="small"
            loading={isLoadingDone}
            loadingPosition="end"
            variant="contained"
            onClick={() => updateTaskHandler(id, "Done")}
          >
            Mark as Done
          </Button>
          <Button
            size="small"
            loading={isLoadingRemovePending}
            loadingPosition="end"
            variant="outlined"
            color="primary"
            onClick={() => deleteTaskHandler(id, "Pending")}
          >
            Remove Task
          </Button>
        </>
      ),
    };

    return statusMap[status] || null; // Return `null` if no matching status
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <Accordion key={item["_id"]}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="in-progress-content"
              id="in-progress-header"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "flex-start",
                  // gap: { xs: "0.5rem", sm: "01rem" },
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{item.title}</Typography>
                <Chip
                  label={categoryIdentifier(item.category)}
                  color={categoryWeight(item.category)}
                  variant="filled"
                  size="small"
                  sx={{
                    fontSize: "0.6rem",
                    height: "15px",
                    minWidth: "auto",
                    padding: "0 1px",
                  }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.775rem",
                    sm: "0.775rem",
                    md: "0.875rem",
                    lg: "0.875rem",
                  },
                  lineHeight: 1.5,
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {item.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    item.status === "Done" ? "flex-end" : "center", // Align buttons to the right
                  gap: 2, // Add space between buttons
                  marginTop: 2, // Add space between Typography and buttons
                }}
              >
                {actionList(item.status, item["_id"])}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Task updated successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSuccessRemove}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Task removed successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isErrorRemove}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          An error occurred while deleting task, please try again.
        </Alert>
      </Snackbar>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          An error occurred while updating task status, please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default TodoListItem;
