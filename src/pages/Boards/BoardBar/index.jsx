import { Box } from "@mui/material";
import React from "react";

const BoardBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: (theme) => theme.trello.boardBarHeight,
        width: "100%",
        backgroundColor: "primary.dark",
      }}
    >
      Board bar
    </Box>
  );
};

export default BoardBar;
