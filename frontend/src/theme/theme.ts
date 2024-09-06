"use client";

import { createTheme } from "@mui/material/styles";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#240046", // Dark Purple
      light: "#6930C3", // Light Purple
    },
    secondary: {
      main: "#6930C3", // white
    },
    error: {
      main: "#FF0000", // Red
    },
    background: {
      default: "#14192B", // Light Purple
      paper: "#240046", // Dark Purple
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#000000", // Black
    },
  },

  typography: {
    fontFamily: rubik.style.fontFamily,
  },
});

export default theme;
