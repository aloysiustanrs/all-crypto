import React from "react";
import { Grid, Typography, Divider, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import millify from "millify";

const StatCard = styled(Card)`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HomeStats = ({ stats }) => {
  let coinPercentageChange = stats.total_volume.usd;
  let color = "";
  if (coinPercentageChange < 0) {
    color = "#93E318";
  } else if (coinPercentageChange > 0) {
    color = "#FE4017";
  } else {
    color = "white";
  }
  return (
    <>
      <Divider sx={{ marginY: 5 }} />
      <Grid container spacing={3} sx={{ marginBottom: 6 }}>
        <Grid item xs={12} md={6} xl={3}>
          <StatCard>
            <Typography variant="subtitle2" mb={1}>
              Total Market Cap:
            </Typography>
            <Typography variant="h6">
              ${" "}
              {millify(`${stats.total_market_cap.usd}`, {
                precision: 2,
              })}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatCard>
            <Typography variant="subtitle2" mb={1}>
              Total Coins:
            </Typography>
            <Typography variant="h6">
              {stats.active_cryptocurrencies}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatCard>
            <Typography variant="subtitle2" mb={1}>
              Total 24 Hour Volume:
            </Typography>
            <Typography variant="h6">
              ${" "}
              {millify(`${stats.total_volume.usd}`, {
                precision: 2,
              })}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <StatCard>
            <Typography variant="subtitle2" mb={1}>
              Total Market Cap % Change in last 24 hours:
            </Typography>
            <Typography variant="h6" sx={{ color: color }}>
              {millify(`${stats.market_cap_change_percentage_24h_usd}`, {
                precision: 2,
              })}{" "}
              %
            </Typography>
          </StatCard>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 5 }} />
    </>
  );
};

export default HomeStats;
