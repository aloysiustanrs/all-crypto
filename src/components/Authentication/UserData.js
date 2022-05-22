import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  Grid,
} from "@mui/material/";
import { DataContext } from "../../contexts/DataContext";
import CloseIcon from "@mui/icons-material/Close";
import { auth, db } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { comma } from "number-magic";
import DeleteIcon from "@mui/icons-material/Delete";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserData = () => {
  const [state, setState] = useState(false);

  const { coins, user, setAlert, watchlist } = useContext(DataContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  let navigate = useNavigate();

  return (
    <>
      {["right"].map((anchor) => {  
        return (
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
              sx={{ opacity: 0.99 }}
            >
              <Box
                sx={{
                  width: 320,
                  height: "100vh",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                <Box sx={{ width: "100%", marginTop: 5 }}>
                  <Typography variant="h5">Crypto Watchlist</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                    padding: "30px 0 30px 0 ",
                    overflow: "auto",
                  }}
                >
                  {coins.map((coin) => {
                    function goToCoinPage() {
                      navigate(`/coins/${coin?.id}`);
                    }

                    if (watchlist.includes(coin?.id))
                      return (
                        <React.Fragment key={coin?.id}>
                          <Grid
                            container
                            spacing={0}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexDirection: "row",
                              marginTop: 1,
                              marginBottom: 1,
                            }}
                          >
                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <img
                                src={coin?.image}
                                alt={coin?.symbol}
                                style={{
                                  width: "25px",
                                  marginRight: 15,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ textAlign: "left", cursor: "pointer" }}
                                onClick={goToCoinPage}
                              >
                                {coin.name}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={6}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "right",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ textAlign: "right", paddingRight: 1 }}
                              >
                                $&nbsp;{comma(`${coin.current_price}`)}&nbsp;
                              </Typography>
                              <DeleteIcon
                                sx={{
                                  fontSize: "18px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  removeFromWatchlist(coin);
                                }}
                              />
                            </Grid>
                          </Grid>

                          <Divider
                            sx={{
                              width: "100%",
                              marginTop: 1,
                              marginBottom: 1,
                            }}
                          />
                        </React.Fragment>
                      );
                    else return <></>;
                  })}
                </Box>

                <Button variant="contained" onClick={logOut}>
                  Sign Out
                </Button>
              </Box>
            </Drawer>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default UserData;
