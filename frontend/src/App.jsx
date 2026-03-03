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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
            />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


<Route
  path="/subscriptions"
  element={
    <ProtectedRoute>
      <Subscriptions />
    </ProtectedRoute>
  }
/>

<Route
  path="/library"
  element={
    <ProtectedRoute>
      <Library />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
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
      />
    </ProtectedRoute>
  }
/>


    </Routes>
  );
}

export default App;