import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../../config/api";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { chartDays } from "../../config/data";

const CoinChart = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    const axios = require("axios").default;
    const fetchHistoricalData = async () => {
      const { data } = await axios.get(HistoricalChart(id, days));
      setHistoricalData(data?.prices);
    };
    fetchHistoricalData();
  }, [id, days]);

  return (
    <>
      <Box sx={{ maxWidth: "90%", marginX: "auto", marginTop: 4 }}>
        <Line
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days )`,
                borderColor: "#0063AD",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          size="small"
        >
          {chartDays.map((day) => {
            return (
              <ToggleButton
                key={day.value}
                value={day.value}
                aria-label="left aligned"
                onClick={() => {
                  setDays(day.value);
                }}
              >
                {day.label}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
    </>
  );
};

export default CoinChart;
