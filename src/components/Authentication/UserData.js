import React, { useState, useContext } from "react";
import { Avatar, Box, Drawer, Typography } from "@mui/material/";
import { DataContext } from "../../contexts/DataContext";
import CloseIcon from "@mui/icons-material/Close";
const UserData = () => {
  const [state, setState] = useState(false);

  const { user } = useContext(DataContext);

  console.log(user);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            src={user.photoURL}
            alt="Remy Sharp"
            sx={{ ml: "auto", cursor: "pointer" }}
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{
                width: 320,
                height: "100vh",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "64px",
                padding: 4,
              }}
            >
              <CloseIcon
                sx={{
                  position: "absolute",
                  top: "80px",
                  left: "20px",
                  cursor: "pointer",
                }}
                onClick={toggleDrawer("right", false)}
              />

              <Typography variant="h5">{user.email}</Typography>

              <Typography variant="h5">{user.email}</Typography>
              <Typography variant="h5">{user.email}</Typography>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default UserData;
