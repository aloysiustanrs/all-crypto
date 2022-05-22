import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { Snackbar } from "@mui/material";

const Alert = () => {
  const { alert, setAlert } = useContext(DataContext);

  //Snackbar

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      message={alert.message}
    />
  );
};

export default Alert;
