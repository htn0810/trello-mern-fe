import Column from "@/pages/Boards/BoardContent/ListColumns/Column/Column";
import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNewColumnAPI } from "@/apis";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "@/redux/activeBoard/activeBoardSlice";
import { cloneDeep } from "lodash";

const ListColumns = ({ columns }) => {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Please enter column title");
      return;
    }

    const newColumnData = {
      title: newColumnTitle,
      boardId: "",
    };

    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // update state board
    const newBoard = cloneDeep(board);
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    dispatch(updateCurrentActiveBoard(newBoard));

    toggleOpenNewColumnForm();
    setNewColumnTitle("");
  };

  return (
    <SortableContext
      items={columns?.map((col) => col._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            mx: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Column column={column} key={column._id} />
        ))}

        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              ":hover": {
                bgcolor: "#ffffff52",
              },
            }}
          >
            <Button
              startIcon={<AddBoxIcon />}
              sx={{
                color: "white",
                width: "100%",
                pl: 2.5,
                py: 1,
                justifyContent: "flex-start",
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#fff",
              display: "flex",
              // flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{ minWidth: 120 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={addNewColumn}
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  borderColor: (theme) => theme.palette.primary.main,
                  "&:hover": { opacity: 0.95 },
                }}
              >
                Add
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  cursor: "pointer",
                  "&:hover": { color: "red" },
                }}
                onClick={toggleOpenNewColumnForm}
              ></CloseIcon>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
