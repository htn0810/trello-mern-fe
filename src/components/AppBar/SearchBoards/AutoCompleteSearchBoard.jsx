import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchBoardsAPI } from "@/apis";
import { useDebounceFn } from "@/customHook/useDebounceFn";

function AutoCompleteSearchBoard() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setBoards(null);
    }
  }, [open]);

  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value;
    if (!searchValue) return;
    console.log(searchValue);

    const searchPath = `?${createSearchParams({ "q[title]": searchValue })}`;
    console.log(searchPath);

    setLoading(true);
    fetchBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debounceSearchBoard = useDebounceFn(handleInputSearchChange, 750);

  const handleSelectedBoard = (event, selectedBoard) => {
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      noOptionsText={!boards ? "Type to search board..." : "No board found!"}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(board) => board.title}
      options={boards || []}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      onInputChange={debounceSearchBoard}
      onChange={handleSelectedBoard}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: (theme) => theme.palette.primary.main }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    sx={{ color: (theme) => theme.palette.primary.main }}
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& label": { color: (theme) => theme.palette.primary.main },
            "& input": { color: (theme) => theme.palette.primary.main },
            "& label.Mui-focused": {
              color: (theme) => theme.palette.primary.main,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
              "&:hover fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
            ".MuiSvgIcon-root": {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearchBoard;
