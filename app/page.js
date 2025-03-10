"use client";
import React from "react";
import SplashCursor from "@/components/splashCursor";
import Todo from "@/components/todo";
import TodoList from "@/components/todoList";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const CenteredBox = ({ children }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      {children}
    </Box>
  );
  return (
    <>
      <SplashCursor />
      <CenteredBox>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", margin: "16px 0" }}
        >
          Task Tracker
        </Typography>
      </CenteredBox>
      <CenteredBox>
        <Todo />
      </CenteredBox>
      <CenteredBox>
        <TodoList />
      </CenteredBox>
    </>
  );
}
