"use client";
import React from "react";
import { Container, Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TodoListItem from "./todoListItem";

const TodoList = () => {
  return (
    <Container sx={{ padding: "16px" }}>
      <Grid container spacing={3}>
        {/* In Progress Section */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              textAlign: "center",
              padding: "16px",
              minHeight: "150px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              In Progress
            </Typography>
            <Divider sx={{ margin: "16px 0" }} />
            <Box
              sx={{
                maxHeight: "500px",
                overflowY: "scroll",
                padding: "8px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <TodoListItem key={index} />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Pending Section */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              textAlign: "center",
              padding: "16px",
              minHeight: "150px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              Pending
            </Typography>
            <Divider sx={{ margin: "16px 0" }} />
            <Box
              sx={{
                maxHeight: "500px",
                overflowY: "scroll",
                padding: "8px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },

                scrollbarWidth: "none",
              }}
            >
              {[...Array(8)].map((_, index) => (
                <TodoListItem key={index} />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Done Section */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              textAlign: "center",
              padding: "16px",
              minHeight: "150px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              Done
            </Typography>
            <Divider sx={{ margin: "16px 0" }} />
            <Box
              sx={{
                maxHeight: "500px",
                overflowY: "scroll",
                padding: "8px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
              }}
            >
              {[...Array(3)].map((_, index) => (
                <TodoListItem key={index} />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TodoList;
