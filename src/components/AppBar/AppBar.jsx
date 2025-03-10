import ModeSelect from "@/components/ModeSelect/ModeSelect";
import { Box, SvgIcon, Tooltip, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TrelloIcon from "@/assets/trello.svg?react";
import Workspaces from "@/components/AppBar/Menus/Workspaces";
import Recent from "@/components/AppBar/Menus/Recent";
import Profiles from "@/components/AppBar/Menus/Profiles";
import { Link } from "react-router-dom";
import Notifications from "@/components/AppBar/Notifications/Notifications";
import AutoCompleteSearchBoard from "@/components/AppBar/SearchBoards/AutoCompleteSearchBoard";

const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        display: "flex",
        alignItems: "center",
        height: (theme) => theme.trello.appBarHeight,
        width: "100%",
        justifyContent: "space-between",
        overflowX: "auto",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link to="/boards">
          <AppsIcon sx={{ color: "primary.main", verticalAlign: "middle" }} />
        </Link>
        <Link to={"/"}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloIcon}
              fontSize="small"
              sx={{ color: "primary.main" }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Trello
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Workspaces />
          <Recent />
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AutoCompleteSearchBoard />
        {/*  Dark light system mode */}
        <ModeSelect />
        {/* Notification bell icon */}
        <Notifications />
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "primary.main" }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
