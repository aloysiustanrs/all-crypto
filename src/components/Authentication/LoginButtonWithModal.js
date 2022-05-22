import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  Box,
  Tab,
  Tabs,
  Typography,
  Divider,
} from "@mui/material";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import GoogleButton from "react-google-button";
import Login from "./Login";
import SignUp from "./SignUp";
import { DataContext } from "../../contexts/DataContext";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const modalStyle = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginButtonWithModal = () => {
  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Google Auth
  const googleProvider = new GoogleAuthProvider();

  const { setAlert } = useContext(DataContext);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <>
      <Button variant="contained" sx={{ ml: "auto" }} onClick={handleOpen}>
        Login
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login handleClose={handleClose} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUp handleClose={handleClose} />
          </TabPanel>

          <Divider variant="middle" />

          <Box
            sx={{ display: "flex ", justifyContent: "center", marginTop: 3 }}
          >
            <GoogleButton onClick={signInWithGoogle} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LoginButtonWithModal;
