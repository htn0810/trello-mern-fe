import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useColorScheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Container } from "@mui/material";

export function ModeSelect() {
  const { mode, setMode } = useColorScheme("light");

  const handleChange = (event) => {
    const selectedValue = event.target.value ?? "light";
    setMode(selectedValue);
    // For TypeScript, cast `event.target.value as 'light' | 'dark' | 'system'`:
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode ?? "light"}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="system">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" />
            Dark
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: (theme) => theme.trello.appBarHeight,
          width: "100%",
          backgroundColor: "primary.light",
        }}
      >
        <ModeSelect />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: (theme) => theme.trello.boardBarHeight,
          width: "100%",
          backgroundColor: "primary.dark",
        }}
      >
        Board bar
      </Box>
      <Box
        sx={{
          width: "100%",
          height: (theme) =>
            `calc(100% - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
          backgroundColor: "primary.main",
        }}
      >
        Board content
      </Box>
    </Container>
  );
}

export default App;
