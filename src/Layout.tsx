import { motion } from "motion/react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-baham-cream text-baham-ink">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
