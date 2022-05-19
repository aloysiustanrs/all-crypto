import "./App.css";
import Navbar from "./components/Nav/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CoinTable from "./components/Table/CoinTable";
import CoinPage from "./components/CoinPage/CoinInfo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
              path="/coins/:id"
              element={
                <>
                  <CoinPage />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Navbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
