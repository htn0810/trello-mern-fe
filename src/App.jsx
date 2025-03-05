import NotFound from "@/pages/404/NotFound";
import AccountVerification from "@/pages/Auth/AccountVerification";
import Auth from "@/pages/Auth/Auth";
import Board from "@/pages/Boards/_id";
import { selectCurrentUser } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      {/* <Route index element={<Board />} /> */}
      <Route
        path="/"
        element={<Navigate to="/boards/67bde4fb91ce8893ccc23f55" replace />}
      />
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path="/boards/:boardId" element={<Board />} />
      </Route>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
