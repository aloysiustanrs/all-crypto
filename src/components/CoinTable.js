import {
  Container,
  Typography,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CoinList } from "../config/api";
import { comma, toFixed } from "number-magic";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const axios = require("axios");

  const fetchCoinList = async () => {
    const { data } = await axios.get(CoinList());
    setCoins(data);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoinList();
  }, []);
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        sx={{ marginTop: 6, marginBottom: 6, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">7d %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume (24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((coin) => (
                <TableRow key={coin.name}>
                  <TableCell align="center">{coin.market_cap_rank}</TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={coin?.image}
                      alt={coin.name}
                      style={{ marginRight: 20, height: "50px", width: "50px" }}
                    />
                    {coin.name}
                  </TableCell>
                  <TableCell align="right">
                    $&nbsp;{comma(`${coin.current_price}`)}
                  </TableCell>
                  <TableCell align="right">
                    {toFixed(`${coin.price_change_percentage_24h_in_currency}`)}
                    &nbsp;%
                  </TableCell>
                  <TableCell align="right">
                    {toFixed(`${coin.price_change_percentage_7d_in_currency}`)}
                    &nbsp;%
                  </TableCell>
                  <TableCell align="right">
                    $&nbsp;{comma(`${coin.market_cap}`)}
                  </TableCell>
                  <TableCell align="right">
                    $&nbsp;{comma(`${coin.total_volume}`)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={10} marginBottom={10}>
        <Pagination
          count={25}
          color="primary"
          onChange={(event, pageNumber) => {
            window.scroll(0, 450);
            setPage(pageNumber);
          }}
        />
      </Stack>
    </Container>
  );
};

export default CoinTable;
