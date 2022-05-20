import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import NewspaperIcon from "@mui/icons-material/Newspaper";

import { Link } from "react-router-dom";

export const mainListItems = (
  <>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" sx={{ color: "white" }} />
      </ListItemButton>
    </Link>
    <Link to="/cryptocurrency">
      <ListItemButton>
        <ListItemIcon>
          <CurrencyBitcoinIcon />
        </ListItemIcon>
        <ListItemText primary="Cryptocurrency" sx={{ color: "white" }} />
      </ListItemButton>
    </Link>
  </>
);
