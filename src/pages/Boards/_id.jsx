import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import AppBar from "@/components/AppBar/AppBar";
import BoardBar from "@/pages/Boards/BoardBar/BoardBar";
import BoardContent from "@/pages/Boards/BoardContent/BoardContent";
import { mockData } from "@/apis/mock-data";
import { fetchBoardDetailsAPI } from "@/apis";

const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "67bc9908d36f588e8bb836c2";
    fetchBoardDetailsAPI(boardId).then((board) => setBoard(board));
  }, []);
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
};

export default Board;
