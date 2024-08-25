import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/notifications"
          element={<NotificationPage></NotificationPage>}
        />
        <Route
          path="/profile/:username"
          element={<ProfilePage></ProfilePage>}
        />
      </Routes>
      <RightPanel></RightPanel>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
