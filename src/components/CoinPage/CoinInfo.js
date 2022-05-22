import {
  Container,
  Typography,
  Chip,
  CircularProgress,
  Divider,
  Box,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { toFixed, comma } from "number-magic";
import styled from "@emotion/styled";
import CoinChart from "./CoinChart";
import { DataContext } from "../../contexts/DataContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const BoxForData = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState();

  const { user, watchlist, setAlert } = useContext(DataContext);

  useEffect(() => {
    const axios = require("axios").default;
    const fetchSingleCoin = async () => {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setLoading(false);
    };
    fetchSingleCoin();
  }, [id]);

  const positive = coin?.market_data?.price_change_percentage_24h;
  const totalSupply = coin?.market_data?.total_supply;

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} added to the watchlist !`,
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
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} removed from the watchlist !`,
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

  const inWatchlist = watchlist.includes(coin?.id);

  return (
    <>
      {loading ? (
        <Container sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <Grid
            container
            columnGap={5}
            sx={{ marginTop: 5, justifyContent: "center" }}
          >
            <Grid item xs={11} lg={5}>
              <Typography
                variant="h4"
                sx={{
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <img src={coin?.image?.small} alt={coin?.symbol} />
                &nbsp;
                {coin?.name}
              </Typography>
              <Box sx={{ marginTop: 2, marginBottom: 3 }}>
                <Chip
                  size="small"
                  label={`Rank ${coin?.market_cap_rank}`}
                  sx={{ marginRight: 1 }}
                />
                <Chip size="small" label={coin?.symbol?.toUpperCase()} />
              </Box>

              <Typography variant="h4" sx={{ marginBottom: 3 }}>
                $&nbsp;{comma(coin?.market_data?.current_price?.usd)} &nbsp;
                <Chip
                  label={`${toFixed(
                    coin?.market_data?.price_change_percentage_24h
                  )}%`}
                  color={positive > 0 ? "success" : "error"}
                  sx={{ fontSize: "15px" }}
                />
              </Typography>
              {user && (
                <Button
                  variant="contained"
                  startIcon={<StarIcon />}
                  size="small"
                  sx={{ backgroundColor: inWatchlist ? "#D9686A" : "#90caf9" }}
                  onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                >
                  {inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                </Button>
              )}

              <Paper
                elevation={6}
                sx={{ marginTop: 5, marginBottom: 2, padding: 4 }}
              >
                <BoxForData>
                  <Typography>Market&nbsp;Cap&nbsp;:</Typography>
                  <Typography>
                    ${comma(coin?.market_data?.market_cap?.usd)}
                  </Typography>
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
                <BoxForData>
                  <Typography>24h&nbsp;Volume&nbsp;:</Typography>
                  <Typography>
                    ${comma(coin?.market_data?.market_cap?.usd)}
                  </Typography>
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
                <BoxForData>
                  <Typography>Circulating&nbsp;Supply&nbsp;:</Typography>
                  <Typography>
                    {comma(coin?.market_data?.circulating_supply)}
                  </Typography>
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
                <BoxForData>
                  <Typography>Total&nbsp;Supply&nbsp;:</Typography>
                  <Typography>
                    {totalSupply ? comma(coin?.market_data?.total_supply) : "∞"}
                  </Typography>
                </BoxForData>
              </Paper>
            </Grid>
            <Grid
              item
              xs={11}
              lg={5}
              sx={{
                display: "flex",
                flexDirection: "column ",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  height: "80px",
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  fontWeight: "bold",
                }}
              >
                Info
              </Typography>
              <Paper
                elevation={6}
                sx={{ marginTop: 3, marginBottom: 2, padding: 4 }}
              >
                <BoxForData>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Website&nbsp;:
                  </Typography>
                  <Chip
                    label={coin?.links?.homepage[0]?.slice(8, -1)}
                    component="a"
                    icon={<LinkIcon />}
                    href={coin?.links?.homepage[0]}
                    clickable
                  />
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
                <BoxForData>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Explorer&nbsp;:
                  </Typography>
                  <Chip
                    label={coin?.links?.blockchain_site[0]?.slice(8, -1)}
                    component="a"
                    icon={<LinkIcon />}
                    href={coin?.links?.blockchain_site[0]}
                    clickable
                  />
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
                <BoxForData>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Github&nbsp;:
                  </Typography>
                  <Chip
                    label={coin?.links?.repos_url?.github[0]?.slice(8, -1)}
                    component="a"
                    icon={<LinkIcon />}
                    href={coin?.links?.repos_url?.github[0]}
                    clickable
                  />
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
                <BoxForData>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Reddit&nbsp;:
                  </Typography>
                  <Chip
                    label={coin?.links?.subreddit_url?.slice(8)}
                    component="a"
                    icon={<LinkIcon />}
                    href={coin?.links?.subreddit_url}
                    clickable
                  />
                </BoxForData>
                <Divider
                  variant="middle"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                />
              </Paper>
            </Grid>
          </Grid>
          <CoinChart id={id} />
        </>
      )}
    </>
  );
};

export default CoinPage;
