import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <LandingPage />
        <Auth />

        <Footer />
      </div>

  );
}

export default App;
