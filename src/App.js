import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Nav/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CoinTable from "./components/Table/CoinTable";
import CoinPage from "./components/CoinPage/CoinInfo";
import { DataContext } from "./contexts/DataContext";
import Exchanges from "./components/ExchangesPage/Exchanges";
import { CoinList } from "./config/api";
import { NewsList } from "./config/api";
import NewsInfo from "./components/NewsPage/NewsInfo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [coins, setCoins] = useState([]);
  const [news, setNews] = useState([]);
  const [coinTableLoading, setCoinTableLoading] = useState(false);
  const [newsDataLoading, setNewsDataLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);

  const axios = require("axios");

  const fetchCoinList = async () => {
    setCoinTableLoading(true);
    const { data } = await axios.get(CoinList());

    setCoins(data);
    setCoinTableLoading(false);
  };

  const fetchNewsList = async () => {
    setNewsDataLoading(true);
    const { data } = await axios.get(NewsList());

    setNews(data.articles);
    setNewsDataLoading(false);
  };

  useEffect(() => {
    fetchCoinList();
    fetchNewsList();

    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  return (
    <ThemeProvider theme={darkTheme}>
      <DataContext.Provider
        value={{
          coins,
          coinTableLoading,
          news,
          newsDataLoading,
          alert,
          setAlert,
          user,
        }}
      >
        <div className="App">
          <Navbar>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/cryptocurrency"
                element={
                  <>
                    <CoinTable />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/exchanges"
                element={
                  <>
                    <Exchanges />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/coins/:id"
                element={
                  <>
                    <CoinPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/news"
                element={
                  <>
                    <NewsInfo />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Navbar>
        </div>
      </DataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
