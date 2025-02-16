import ListColumns from "@/pages/Boards/BoardContent/ListColumns/ListColumns";
import { Box } from "@mui/material";

const BoardContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardContentHeight,
        backgroundColor: "primary.main",
        p: "10px 0",
        m: "5px 0",
      }}
    >
      <ListColumns />
    </Box>
  );
};

export default BoardContent;
