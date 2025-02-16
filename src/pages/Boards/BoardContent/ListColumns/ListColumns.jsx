import Column from "@/pages/Boards/BoardContent/ListColumns/Column/Column";
import { Box, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const ListColumns = ({ columns }) => {
  return (
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

      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
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
    </Box>
  );
};

export default ListColumns;
