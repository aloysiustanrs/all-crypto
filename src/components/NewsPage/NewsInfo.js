import React, { useState, useContext } from "react";
import {
  Link,
  Typography,
  Grid,
  Card,
  Box,
  Container,
  CircularProgress,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataContext } from "../../contexts/DataContext";

const NewsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "top",

  [theme.breakpoints.up("lg")]: {
    height: "180px",
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TextTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  [theme.breakpoints.up("sm")]: {
    paddingRight: "20px",
  },

  [theme.breakpoints.down("md")]: {
    paddingBottom: "20px",
  },
}));

const NewsInfo = () => {
  const { news, newsDataLoading } = useContext(DataContext);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    return news.filter(
      (newsItem) =>
        newsItem?.title.toLowerCase().includes(search) ||
        newsItem?.description.toLowerCase().includes(search)
    );
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search news"
        variant="outlined"
        sx={{ marginTop: 6, marginBottom: 6, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {newsDataLoading ? (
        <Container sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
        </Container>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={3} sx={{ marginBottom: 6, paddingX: 1 }}>
            {handleSearch().map((newsItem) => {
              return (
                <Grid item xs={12} lg={4} key={newsItem?.url}>
                  <Link href={newsItem?.url} sx={{ textDecoration: "none" }}>
                    <NewsCard variant="outlined">
                      <Box>
                        <TextTitle>{newsItem?.title}</TextTitle>
                      </Box>

                      <img
                        style={{
                          objectFit: "cover",
                          maxHeight: "120px",
                          maxWidth: "120px",
                        }}
                        src={newsItem?.image}
                        alt={newsItem?.name}
                      />
                    </NewsCard>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default NewsInfo;
