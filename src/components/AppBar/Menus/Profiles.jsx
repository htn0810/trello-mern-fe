import { logoutUserAPI, selectCurrentUser } from "@/redux/user/userSlice";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profiles = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmLogout = useConfirm();
  const handleLogout = () => {
    confirmLogout({
      title: "Log out of your account?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => {
        dispatch(logoutUserAPI());
      })
      .catch(() => {});
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          id="basic-button-profiles"
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt="HTN"
            src={currentUser?.avatar}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profiles",
        }}
      >
        <MenuItem
          sx={{ "&:hover": { color: (theme) => theme.palette.primary.main } }}
        >
          <Avatar
            sx={{ width: 28, height: 28, mr: 2 }}
            src={currentUser?.avatar}
          />
          Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            "&:hover": { color: "red", "& .logout-icon": { color: "red" } },
          }}
        >
          <ListItemIcon className="logout-icon">
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profiles;
