import React, { useEffect, useState } from "react";
import { Link, Typography, Grid, Card, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const NewsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.up("lg")]: {
    height: "180px",
  },

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search?q=cryptocurrency&count=3",
      params: { safeSearch: "Off", textFormat: "Raw" },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        "X-RapidAPI-Key": "6fe370c524mshfddc561441e0256p1d491bjsn85ea234a7eea",
      },
    };

    const fetchNewsData = async () => {
      await axios.request(options).then(({ data }) => {
        setNews([data.value[0], data.value[1], data.value[2]]);
      });
    };

    fetchNewsData();
  }, []);

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
        Top 3 Cryptocurrency News
      </Typography>

      <Grid container spacing={3} sx={{ marginBottom: 6, paddingX: 1 }}>
        <Grid item xs={12} lg={4}>
          <Link href={news[0]?.url}>
            <NewsCard variant="outlined">
              <Typography variant="body2" sx={{ padding: 1, fontSize: "13px" }}>
                {news[0]?.name}
              </Typography>
              <img
                style={{
                  objectFit: "cover",
                  maxHeight: "100px",
                  maxWidth: "100px",
                }}
                src={news[0]?.image?.thumbnail?.contentUrl}
                alt={news[0]?.name}
              />
            </NewsCard>
          </Link>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Link href={news[1]?.url}>
            <NewsCard variant="outlined">
              <Typography variant="body2" sx={{ padding: 1, fontSize: "13px" }}>
                {news[1]?.name}
              </Typography>
              <img
                style={{
                  objectFit: "cover",
                  maxHeight: "100px",
                  maxWidth: "100px",
                }}
                src={news[1]?.image?.thumbnail?.contentUrl}
                alt={news[1]?.name}
              />
            </NewsCard>
          </Link>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Link href={news[2]?.url}>
            <NewsCard variant="outlined">
              <Typography variant="body2" sx={{ padding: 1, fontSize: "13px" }}>
                {news[2]?.name}
              </Typography>
              <img
                style={{
                  objectFit: "cover",
                  maxHeight: "100px",
                  maxWidth: "100px",
                }}
                src={news[2]?.image?.thumbnail?.contentUrl}
                alt={news[2]?.name}
              />
            </NewsCard>
          </Link>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 3,
          marginX: "auto",
        }}
      >
        <RouterLink to="/news">
          <Button variant="outlined" size="medium">
            See all news
          </Button>
        </RouterLink>
      </Box>
    </div>
  );
};

export default News;
