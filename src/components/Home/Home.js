import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TrendingCoinsSection from "./TrendingCoinsSection";

const axios = require("axios").default;

const Home = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins());

    setTrendingCoins([
      data.coins[0].item,
      data.coins[1].item,
      data.coins[2].item,
      data.coins[3].item,
      data.coins[4].item,
      data.coins[5].item,
      data.coins[6].item,
    ]);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  console.log(trendingCoins);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom component="div" mb={8}>
          Home
        </Typography>
        <Grid container spacing={3}>
          {/* Trending Coins */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <TrendingCoinsSection trendingCoins={trendingCoins} />
            </Paper>
          </Grid>
          {/* News */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            ></Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
