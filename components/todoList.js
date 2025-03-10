"use client";
import React from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Badge,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TodoListItem from "./todoListItem";
import { useTasks } from "@/TaskProvider/TaskContetxt";

const TodoList = () => {
  const { fetchTasks, tasksCollection } = useTasks();

  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const fetchResult = await fetchTasks(); // Wait for fetchTasks to complete

        // Handle failure
        if (!fetchResult.ok) {
          return setIsError(true); // Set error state
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false); // End loading after fetch is complete
      }
    };

    fetchData();
  }, [fetchTasks]);

  const collection = ["In Progress", "Pending", "Done"];

  const handleClose = () => {
    // Close all the informative popup
    setIsError(false);
  };

  return (
    <Container sx={{ padding: "16px" }}>
      <Grid container spacing={3}>
        {collection.map((item) => {
          return (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: "16px",
                  minHeight: "150px",
                }}
              >
                <Badge
                  badgeContent={tasksCollection?.[item]?.length}
                  color="secondary"
                >
                  <Typography variant="h6" padding="0px 12px">
                    {item}
                  </Typography>
                </Badge>

                <Divider sx={{ margin: "16px 0" }} />
                <Box
                  sx={{
                    maxHeight: "400px",
                    overflowY: "scroll",
                    padding: "8px",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    scrollbarWidth: "none",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress /> // Show loading spinner while loading
                  ) : tasksCollection?.[item] &&
                    tasksCollection[item].length > 0 ? (
                    <TodoListItem key={item} data={tasksCollection[item]} />
                  ) : (
                    <Typography>No task to display yet.</Typography>
                  )}

                  {/* <TodoListItem key={item} data={tasksCollection?.[item]} /> */}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        open={isError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          An error occurred while fetching task, please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TodoList;
