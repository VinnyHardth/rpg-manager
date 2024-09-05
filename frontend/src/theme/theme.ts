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
    },
    secondary: {
      main: "#FFFFFF", // white
    },
    error: {
      main: "#FF0000", // Red
    },
    background: {
      default: "#FFFFFF", // White
      paper: "#E5E5E5", // Platinum
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
