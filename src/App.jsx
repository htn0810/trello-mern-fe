import NotFound from "@/pages/404/NotFound";
import Board from "@/pages/Boards/_id";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* <Route index element={<Board />} /> */}
      <Route
        path="/"
        element={<Navigate to="/boards/67bde4fb91ce8893ccc23f55" replace />}
      />
      <Route path="/boards/:boardId" element={<Board />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
