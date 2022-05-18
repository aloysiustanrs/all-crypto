import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { GlobalStats } from "../../config/api";
import { Typography } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TrendingCoinsSection from "./TrendingCoinsSection";
import HomeStats from "./HomeStats";
import News from "./NewsSection";

const axios = require("axios").default;

const Home = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [stats, setStats] = useState([]);
  const [toggleShowStats, setToggleShowStats] = useState(false);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins());

    setTrendingCoins(data);
  };

  const fetchGlobalStats = async () => {
    const { data } = await axios.get(GlobalStats());

    setStats(data.data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    fetchGlobalStats();
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography variant="h4" gutterBottom component="div">
            Home
          </Typography>
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  setToggleShowStats(!toggleShowStats);
                }}
              />
            }
            label="Show Global Stats"
          />
        </Box>
        {toggleShowStats && <HomeStats stats={stats} />}
        <Grid container spacing={3}>
          {/* Trending Coins */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
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
              }}
            >
              <News />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
