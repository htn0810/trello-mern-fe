import ListColumns from "@/pages/Boards/BoardContent/ListColumns/ListColumns";
import { mapOrder } from "@/utils/sorts";
import { Box } from "@mui/material";

const BoardContent = ({ board }) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
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
      <ListColumns columns={orderedColumns} />
    </Box>
  );
};

export default BoardContent;
