import React from "react";
import { Container } from "@mui/material";
import AppBar from "@/components/AppBar/AppBar";
import BoardBar from "@/pages/Boards/BoardBar/BoardBar";
import BoardContent from "@/pages/Boards/BoardContent/BoardContent";
import { mockData } from "@/apis/mock-data";

const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
};

export default Board;
