import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <Typography
      variant="caption"
      display="block"
      gutterBottom
      sx={{ textAlign: "center", color: "#71747a", marginY: 4 }}
    >
      © {year} Aloysius Tan All Rights Reserved.
    </Typography>
  );
};

export default Footer;
