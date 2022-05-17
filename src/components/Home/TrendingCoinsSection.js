import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button, Link } from "@mui/material";
import { Typography } from "@mui/material";

const TrendingCoinsSection = ({ trendingCoins }) => {
  const responsive = {
    0: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };

  const items = trendingCoins.map((coin) => {
    return (
      <>
        <Link
          to={`/coins/${coin.id}`}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textDecoration: "none",
            color: "white",
          }}
        >
          <img
            src={coin.large}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <Typography
            variant="h6"
            sx={{ marginTop: 4 }}
            gutterBottom
            component="div"
          >
            {coin.name}
          </Typography>
          <span style={{ fontSize: 22, fontWeight: 500 }}></span>
        </Link>
      </>
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        mt={5}
        mb={10}
        sx={{ textAlign: "center" }}
      >
        Top 7 trending search cryptocurrency coins in the last 24 hours
      </Typography>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={200}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
      <Button
        variant="outlined"
        size="medium"
        sx={{
          marginTop: 12,
          marginBottom: 3,
          maxWidth: "200px",
          marginX: "auto",
        }}
      >
        See all coins
      </Button>
    </div>
  );
};

export default TrendingCoinsSection;
