"use client";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "10px", // Default font size for extra small screens
          lineHeight: 1.5,
          padding: "4px 5px", // Default padding for extra small screens
          minWidth: "60px", // Default minWidth for extra small screens
          "@media (min-width:600px)": {
            fontSize: "10px", // Small screens
            padding: "4px 5px",
            minWidth: "70px",
          },
          "@media (min-width:960px)": {
            fontSize: "12px", // Medium screens
            padding: "4px 5px",
            minWidth: "80px",
          },
          "@media (min-width:1280px)": {
            fontSize: "12px", // Large screens
            padding: "4px 5px",
            minWidth: "90px",
          },
        },
      },
    },
  },
});

export default darkTheme;
