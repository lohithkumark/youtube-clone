import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Subscriptions from "./pages/Subscriptions";
import Library from "./pages/Library";
import History from "./pages/History";
import Upload from "./pages/Upload";
import Channel from "./pages/Channel";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Routes>

      {/* Protected Home */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      {/* Protected Video Page */}
      <Route
        path="/video/:id"
        element={
          <ProtectedRoute>
            <VideoPlayer
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      {/* Channel Page */}
      <Route
        path="/channel/:id"
        element={
          <ProtectedRoute>
            <Channel
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      {/* Other Protected Pages */}
      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <Subscriptions
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Library
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;