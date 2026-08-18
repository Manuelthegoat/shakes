import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Cards from "./pages/Cards/Cards";
import Transfers from "./pages/Transfers/Transfers";
import Settings from "./pages/Settings/Settings";
import "./App.css";

function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;