import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CurrencyBitcoinIcon />
      </ListItemIcon>
      <ListItemText primary="Cryptocurrency" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SwapHorizIcon />
      </ListItemIcon>
      <ListItemText primary="Exchanges" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperIcon />
      </ListItemIcon>
      <ListItemText primary="News" />
    </ListItemButton>
  </>
);
