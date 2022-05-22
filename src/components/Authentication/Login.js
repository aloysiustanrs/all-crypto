import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import { DataContext } from "../../contexts/DataContext";
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { alert, setAlert } = useContext(DataContext);

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign In Successful. Welcome ${result.user.email}`,
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
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ marginTop: "20px" }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
