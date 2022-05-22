import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import { DataContext } from "../../contexts/DataContext";
import { auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { alert, setAlert } = useContext(DataContext);

  //submit sign up
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  console.log(alert.message);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        textAlign: "center",
      }}
    >
      <TextField
        label="Email"
        variant="outlined"
        sx={{ marginTop: "20px" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
