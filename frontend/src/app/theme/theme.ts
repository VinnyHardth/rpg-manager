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
      main: "#14213D", // Oxford Blue
    },
    secondary: {
      main: "#FCA311", // Orange
    },
    error: {
      main: "#FF0000", // Red
    },
    background: {
      default: "#FFFFFF", // White
      paper: "#E5E5E5", // Platinum
    },
    text: {
      primary: "#14213D", // Oxford Blue
      secondary: "#000000", // Black
    },
  },

  typography: {
    fontFamily: rubik.style.fontFamily,
  },
});

export default theme;
