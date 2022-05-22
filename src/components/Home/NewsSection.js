import React, { useContext } from "react";
import {
  Link,
  Typography,
  Grid,
  Card,
  Button,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
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

const News = () => {
  const { news, newsDataLoading } = useContext(DataContext);

  return (
    <>
      {newsDataLoading ? (
        <Container sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
        </Container>
      ) : (
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
              <Link href={news[0]?.url} sx={{ textDecoration: "none" }}>
                <NewsCard variant="outlined">
                  <Box>
                    <TextTitle>{news[0]?.title}</TextTitle>
                  </Box>

                  <img
                    style={{
                      objectFit: "cover",
                      maxHeight: "120px",
                      maxWidth: "120px",
                    }}
                    src={news[0]?.image}
                    alt={news[0]?.name}
                  />
                </NewsCard>
              </Link>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Link href={news[1]?.url} sx={{ textDecoration: "none" }}>
                <NewsCard variant="outlined">
                  <Box>
                    <TextTitle>{news[1]?.title}</TextTitle>
                  </Box>

                  <img
                    style={{
                      objectFit: "cover",
                      maxHeight: "120px",
                      maxWidth: "120px",
                    }}
                    src={news[1]?.image}
                    alt={news[1]?.name}
                  />
                </NewsCard>
              </Link>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Link href={news[2]?.url} sx={{ textDecoration: "none" }}>
                <NewsCard variant="outlined">
                  <Box>
                    <TextTitle>{news[2]?.title}</TextTitle>
                  </Box>

                  <img
                    style={{
                      objectFit: "cover",
                      maxHeight: "120px",
                      maxWidth: "120px",
                    }}
                    src={news[2]?.image}
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
      )}
    </>
  );
};

export default News;
