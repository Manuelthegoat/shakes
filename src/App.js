import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Cards from "./pages/Cards/Cards";
import Transfers from "./pages/Transfers/Transfers";
import Settings from "./pages/Settings/Settings";
import Admin from "./pages/Admin/Admin";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import Stats from "./components/Stats/Stats";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Personal from "./pages/Personal/Personal";
import Business from "./pages/Business/Business";
import Support from "./pages/Support/Support";
import ApplyCard from "./pages/ApplyCard/ApplyCard";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import InfoPage from "./pages/Info/Info";
import "./App.css";

function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />{" "}
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />{" "}
        <Route path="/personal" element={<Personal />} />
        <Route path="/business" element={<Business />} />
        <Route path="/support" element={<Support />} />
        <Route path="/rates" element={<InfoPage />} />
        {["checking", "savings", "credit", "transfers", "about", "careers", "press", "blog", "security", "status", "privacy", "terms", "accessibility"].map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<InfoPage />} />
        ))}
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
          <Route path="cards/apply" element={<ApplyCard />} />
          <Route
            path="admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
