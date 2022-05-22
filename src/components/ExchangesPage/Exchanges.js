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
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useState, useContext } from "react";
import { comma, toFixed } from "number-magic";
import { ExchangesList } from "../../config/api";
import { DataContext } from "../../contexts/DataContext";

const Exchanges = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const [exchanges, setExchanges] = useState([]);

  const handleSearch = () => {
    return exchanges.filter(
      (exchange) =>
        exchange?.id.toLowerCase().includes(search) ||
        exchange?.name.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    const axios = require("axios").default;
    const fetchExchangesData = async () => {
      setLoading(true);
      const { data } = await axios.get(ExchangesList());
      setExchanges(data);
      setLoading(false);
    };
    fetchExchangesData();
  }, []);

  const { coins } = useContext(DataContext);
  const priceOfBitcoin = coins[0]?.current_price;

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mt: 4 }}>
        List Of Cryptocurrency Exchanges
      </Typography>
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        sx={{ marginTop: 6, marginBottom: 6, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <Container sx={{ textAlign: "center", marginTop: 5 }}>
          <CircularProgress />
        </Container>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell>Exchange</TableCell>
                <TableCell align="center">Trust&nbsp;Score</TableCell>
                <TableCell align="center">Volume&nbsp;(24h)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((exchange) => {
                  function goToLink() {
                    window.location = exchange?.url;
                  }

                  const volume_24h_usd =
                    priceOfBitcoin * exchange?.trade_volume_24h_btc;

                  return (
                    <TableRow
                      key={exchange?.name}
                      sx={{ cursor: "pointer" }}
                      onClick={goToLink}
                    >
                      <TableCell align="center">
                        {exchange?.trust_score_rank}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src={exchange?.image}
                          alt={exchange?.name}
                          style={{
                            marginRight: 20,
                            height: "50px",
                            width: "50px",
                          }}
                        />
                        {exchange?.name}
                      </TableCell>
                      <TableCell align="center">
                        {exchange.trust_score}
                      </TableCell>
                      <TableCell align="center">
                        $&nbsp;
                        {comma(toFixed(volume_24h_usd))}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Stack spacing={2} alignItems="center" marginTop={10} marginBottom={10}>
        <Pagination
          count={10}
          color="primary"
          onChange={(event, pageNumber) => {
            setPage(pageNumber);
          }}
        />
      </Stack>
    </Container>
  );
};

export default Exchanges;
