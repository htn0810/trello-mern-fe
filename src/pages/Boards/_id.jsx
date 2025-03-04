import { useEffect } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import AppBar from "@/components/AppBar/AppBar";
import BoardBar from "@/pages/Boards/BoardBar/BoardBar";
import BoardContent from "@/pages/Boards/BoardContent/BoardContent";
import {
  moveCardToDifferentColumnsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "@/apis";
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "@/redux/activeBoard/activeBoardSlice";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { useParams } from "react-router-dom";

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);

  const { boardId } = useParams();
  useEffect(() => {
    // const boardId = "67bde4fb91ce8893ccc23f55";

    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch, boardId]);
  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    dispatch(updateCurrentActiveBoard(newBoard));

    // sync up board data to BE
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds,
    });
  };

  const moveCardInSameColumn = (dndOrderedCards, dndOrderCardIds, columnId) => {
    // update state board
    const newBoard = cloneDeep(board);
    const updatedColumn = newBoard.columns.find((col) => col._id === columnId);
    if (updatedColumn) {
      updatedColumn.cards = dndOrderedCards;
      updatedColumn.cardOrderIds = dndOrderCardIds;
    }
    dispatch(updateCurrentActiveBoard(newBoard));

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

    dispatch(updateCurrentActiveBoard(newBoard));

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
        moveColumn={moveColumn}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardToDifferentColumns={moveCardToDifferentColumns}
      />
    </Container>
  );
};

export default Board;
