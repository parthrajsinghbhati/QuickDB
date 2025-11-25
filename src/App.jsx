import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateDatabase from "./pages/CreateDatabase";
import Databases from "./pages/Databases";
import DatabaseDetail from "./pages/DatabaseDetail";
import CreateTable from "./pages/CreateTable";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/create"
          element={
            <ProtectedRoute>
              <CreateDatabase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/databases"
          element={
            <ProtectedRoute>
              <Databases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/database/:id"
          element={
            <ProtectedRoute>
              <DatabaseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/database/:id/new"
          element={
            <ProtectedRoute>
              <CreateTable />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;