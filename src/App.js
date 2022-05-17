import "./App.css";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";

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
            <Route path="/" element={<Home />} />
            <Route path="/cryptocurrency" element={<Home />} />
          </Routes>
        </Navbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
