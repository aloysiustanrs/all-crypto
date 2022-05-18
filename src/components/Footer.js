import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear;
  console.log(year);

  return (
    <div>
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        overline text
      </Typography>
    </div>
  );
};

export default Footer;
