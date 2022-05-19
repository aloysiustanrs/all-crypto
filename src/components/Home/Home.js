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
import { styled } from "@mui/material/styles";

const axios = require("axios").default;

const BoxForHomeAndSwitch = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "40px",
  marginBottom: "40px",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Home = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [stats, setStats] = useState([]);
  const [toggleShowStats, setToggleShowStats] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTrendingCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins());
    setTrendingCoins(data);
    setLoading(false);
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
        <BoxForHomeAndSwitch>
          <Typography variant="h4">Home</Typography>
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
        </BoxForHomeAndSwitch>
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
              <TrendingCoinsSection
                trendingCoins={trendingCoins}
                loading={loading}
              />
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
