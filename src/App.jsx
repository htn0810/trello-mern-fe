import NotFound from "@/pages/404/NotFound";
import AccountVerification from "@/pages/Auth/AccountVerification";
import Auth from "@/pages/Auth/Auth";
import Boards from "@/pages/Boards";
import Board from "@/pages/Boards/_id";
import Settings from "@/pages/Settings/Settings";
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
      <Route
        path="/"
        element={<Navigate to="/boards/67bde4fb91ce8893ccc23f55" replace />}
      />
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
