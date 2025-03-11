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
          fontSize: "10px",
          lineHeight: 1.5,
          padding: "4px 5px",
          minWidth: "60px",
          "@media (min-width:600px)": {
            fontSize: "10px",
            padding: "4px 5px",
            minWidth: "70px",
          },
          "@media (min-width:960px)": {
            fontSize: "12px",
            padding: "4px 5px",
            minWidth: "80px",
          },
          "@media (min-width:1280px)": {
            fontSize: "12px",
            padding: "4px 5px",
            minWidth: "90px",
          },
        },
      },
    },
  },
});

export default darkTheme;
