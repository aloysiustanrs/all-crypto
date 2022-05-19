import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Box, Button, Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import millify from "millify";

const TrendingCoinsSection = ({ trendingCoins }) => {
  let navigate = useNavigate();

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
    function goToCoinPage() {
      navigate(`/coins/${coin?.id}`);
    }
    let coinPercentageChange = coin.price_change_percentage_24h;
    let color = "";
    if (coinPercentageChange > 0) {
      color = "#93E318";
    } else if (coinPercentageChange < 0) {
      color = "#FE4017";
    } else {
      color = "white";
    }

    return (
      <>
        <Link
          onClick={goToCoinPage}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textDecoration: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: 4,
            }}
          >
            {coin.market_cap_rank}
          </Typography>
          <img
            src={coin.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {`${coin.symbol}`.toUpperCase()}
          </Typography>
          <Typography variant="subtitle2" sx={{ marginTop: 2, color: color }}>
            {millify(`${coin.price_change_percentage_24h}`, {
              precision: 2,
            })}{" "}
            %
          </Typography>
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
        Top 10 Cryptocurrency by Market Cap
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
      <Box
        sx={{
          marginTop: 12,
          marginBottom: 3,
          maxWidth: "200px",
          marginX: "auto",
        }}
      >
        <RouterLink to="/cryptocurrency">
          <Button variant="outlined" size="medium">
            See all coins
          </Button>
        </RouterLink>
      </Box>
    </div>
  );
};

export default TrendingCoinsSection;
