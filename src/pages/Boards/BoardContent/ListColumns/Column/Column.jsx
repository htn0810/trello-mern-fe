import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ListCards from "@/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "react-toastify";

import { useConfirm } from "material-ui-confirm";

const Column = ({ column, createNewCard, deleteColumn }) => {
  const confirmDeleteColumn = useConfirm();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error("Please enter card title");
      return;
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id,
    };
    createNewCard(newCardData);

    toggleOpenNewCardForm();
    setNewCardTitle("");
  };

  const handleDeleteColumn = async (column) => {
    const { confirmed, reason } = await confirmDeleteColumn({
      description: `This action will permanently delete your Column ${column.title} and its Cards! Are you sure?`,
    });

    if (confirmed) {
      console.log("🚀 ~ handleDeleteColumn ~ column:", column);
      deleteColumn(column._id);
    }
  };

  const orderedCards = column?.cards;
  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: "#eee",
          ml: 2,
          borderRadius: "8px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More Options">
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "primary.main", cursor: "pointer" }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClick={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx={{
                  "&:hover": {
                    color: (theme) => theme.palette.primary.main,
                    "& .add-icon": {
                      color: (theme) => theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ListItemIcon className="add-icon">
                  <AddCardIcon />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentCutIcon />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentPasteIcon />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteColumn(column)}
                sx={{
                  "&:hover": {
                    color: "red",
                    "& .delete-icon": { color: "red" },
                  },
                }}
              >
                <ListItemIcon className="delete-icon">
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ minHeight: "60px" }}>
          <ListCards cards={orderedCards} />
        </Box>
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<AddCardIcon />}
                onClick={toggleOpenNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title="Drag to reorder">
                <DragHandleIcon sx={{ cursor: "grab" }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="Enter card title..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{ minWidth: 120 }}
              />
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                data-no-dnd
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={addNewCard}
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
                  onClick={toggleOpenNewCardForm}
                ></CloseIcon>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Column;
