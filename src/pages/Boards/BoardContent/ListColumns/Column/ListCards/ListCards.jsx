import { Box } from "@mui/material";
import Card from "@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card";

const ListCards = () => {
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
      <Card />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
    </Box>
  );
};

export default ListCards;
