import { Box } from "@mui/material";
import Card from "@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";

const ListCards = ({ cards }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: "0 5px",
        m: "0 5px",
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} - 
            ${theme.trello.columnHeaderHeight} - 
            ${theme.trello.columnFooterHeight})`,
      }}
    >
      {cards?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  );
};

export default ListCards;
