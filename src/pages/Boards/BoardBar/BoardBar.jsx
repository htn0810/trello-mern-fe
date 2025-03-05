import { Avatar, AvatarGroup, Box, Button } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FilterListIcon from "@mui/icons-material/FilterList";
import BoltIcon from "@mui/icons-material/Bolt";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import PublicIcon from "@mui/icons-material/Public";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "@/utils/formatters";

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
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": { width: 34, height: 34, cursor: "pointer" },
          }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
