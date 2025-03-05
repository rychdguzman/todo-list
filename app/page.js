import SplashCursor from "@/components/splashCursor";
import Todo from "@/components/todo";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SplashCursor />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          width: "100vw", // Ensures full viewport width
          height: "100vh", // Ensures full viewport height
        }}
      >
        <Todo />
      </Box>
    </>
  );
}
