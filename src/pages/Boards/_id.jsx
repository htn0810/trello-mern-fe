import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import AppBar from "@/components/AppBar/AppBar";
import BoardBar from "@/pages/Boards/BoardBar/BoardBar";
import BoardContent from "@/pages/Boards/BoardContent/BoardContent";
import { mapOrder } from "@/utils/sorts";
// import { mockData } from "@/apis/mock-data";
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnAPI,
  fetchBoardDetailsAPI,
  moveCardToDifferentColumnsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "@/apis";
import { toast } from "react-toastify";

const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "67bde4fb91ce8893ccc23f55";
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((col) => {
        col.cards = mapOrder(col?.cards, col?.cardOrderIds, "_id");
      });
      setBoard(board);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // update state board
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // update state board
    const newBoard = { ...board };
    const updatedColumn = newBoard.columns.find(
      (col) => col._id === createdCard.columnId
    );
    if (updatedColumn) {
      updatedColumn.cards.push(createdCard);
      updatedColumn.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    setBoard(newBoard);

    // sync up board data to BE
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds,
    });
  };

  const moveCardInSameColumn = (dndOrderedCards, dndOrderCardIds, columnId) => {
    // update state board
    const newBoard = { ...board };
    const updatedColumn = newBoard.columns.find((col) => col._id === columnId);
    if (updatedColumn) {
      updatedColumn.cards = dndOrderedCards;
      updatedColumn.cardOrderIds = dndOrderCardIds;
    }
    setBoard(newBoard);

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderCardIds });
  };

  const moveCardToDifferentColumns = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;

    setBoard(newBoard);

    moveCardToDifferentColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find((c) => c._id === prevColumnId)
        ?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  const deleteColumn = async (columnId) => {
    const newBoard = { ...board };
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (colId) => colId !== columnId
    );
    newBoard.columns = newBoard.columns.filter((col) => col._id !== columnId);
    console.log("🚀 ~ deleteColumn ~ newBoard:", newBoard);

    deleteColumnAPI(board._id, columnId).then((res) => {
      toast.success("Delete column successfully!");
    });

    setBoard(newBoard);
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardToDifferentColumns={moveCardToDifferentColumns}
        deleteColumn={deleteColumn}
      />
    </Container>
  );
};

export default Board;
