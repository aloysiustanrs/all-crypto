import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { Snackbar } from "@mui/material";
import { Alert as AlertItem } from "@mui/material";

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
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <AlertItem variant="filled" severity={alert.type}>
        {alert.message}
      </AlertItem>
    </Snackbar>
  );
};

export default Alert;
