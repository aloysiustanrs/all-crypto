import {
  Container,
  Typography,
  Chip,
  CircularProgress,
  Divider,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { toFixed, comma } from "number-magic";
import styled from "@emotion/styled";
import CoinChart from "./CoinChart";

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
                variant="h6"
                sx={{
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "50px",
                  fontWeight: "bold",
                }}
              >
                <img src={coin?.image?.small} alt={coin?.symbol} />
                &nbsp;
                {coin?.name}
              </Typography>
              <Box sx={{ marginTop: 3, marginBottom: 4 }}>
                <Chip
                  size="small"
                  label={`Rank ${coin?.market_cap_rank}`}
                  sx={{ marginRight: 1 }}
                />
                <Chip size="small" label={coin?.symbol?.toUpperCase()} />
              </Box>

              <Typography variant="h4">
                $&nbsp;{comma(coin?.market_data?.current_price?.usd)} &nbsp;
                <Chip
                  label={`${toFixed(
                    coin?.market_data?.price_change_percentage_24h
                  )}%`}
                  color={positive > 0 ? "success" : "error"}
                  sx={{ fontSize: "15px" }}
                />
              </Typography>
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
