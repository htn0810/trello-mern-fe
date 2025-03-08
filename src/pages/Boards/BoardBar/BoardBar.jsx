import { Box, Button } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FilterListIcon from "@mui/icons-material/FilterList";
import BoltIcon from "@mui/icons-material/Bolt";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import PublicIcon from "@mui/icons-material/Public";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "@/utils/formatters";
import BoardUserGroup from "@/pages/Boards/BoardBar/BoardUserGroup";

const BoardBar = ({ board }) => {
  return (
    <Box
      px={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: (theme) => theme.trello.boardBarHeight,
        width: "100%",
        borderTop: "1px solid #e0e0e0",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          startIcon={<WidgetsIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {board?.title}
        </Button>
        <Button
          startIcon={<PublicIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {capitalizeFirstLetter(board?.type)}
        </Button>
        <Button
          startIcon={<AddToDriveIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Add To Google Drive
        </Button>
        <Button
          startIcon={<BoltIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Automation
        </Button>
        <Button
          startIcon={<FilterListIcon />}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Filter
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <BoardUserGroup boardUsers={board?.FE_allUsers} />
      </Box>
    </Box>
  );
};

export default BoardBar;
