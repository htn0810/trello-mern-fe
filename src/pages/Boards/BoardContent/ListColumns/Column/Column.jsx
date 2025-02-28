import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
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
import { useState } from "react";
import ListCards from "@/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards";
import { mapOrder } from "@/utils/sorts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({ column }) => {
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
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
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
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
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ minHeight: "10px" }}>
          <ListCards cards={orderedCards} />
        </Box>
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title="Drag to reorder">
            <DragHandleIcon sx={{ cursor: "grab" }} />
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default Column;
