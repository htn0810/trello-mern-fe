import { Box } from "@mui/material";

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) =>
          `calc(100% - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        backgroundColor: "primary.main",
      }}
    >
      Board content
    </Box>
  );
};

export default BoardContent;
