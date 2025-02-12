import ModeSelect from "@/components/ModeSelect";
import { Box } from "@mui/material";
import React from "react";

const AppBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: (theme) => theme.trello.appBarHeight,
        width: "100%",
        backgroundColor: "primary.light",
      }}
    >
      <ModeSelect />
    </Box>
  );
};

export default AppBar;
