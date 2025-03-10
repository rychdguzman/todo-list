"use client";
import React from "react";
import SplashCursor from "@/components/splashCursor";
import Todo from "@/components/todo";
import TodoList from "@/components/todoList";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SplashCursor />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Todo />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <TodoList />
      </Box>
    </>
  );
}
