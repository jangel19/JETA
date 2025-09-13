import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Analyze from "./pages/Analyze";
import Usage from "./pages/Usage";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";


import { ThemeProvider } from "@/components/ThemeProvider";


function Shell({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-default mt-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-6 text-sm text-subtle">
          © {new Date().getFullYear()} JETA AI — Built for investors & small developers
        </div>
      </footer>
    </div>
  );
}
const router = createBrowserRouter([
  { path: "/", element: <Shell><Landing /></Shell> },
  { path: "/how-it-works", element: <Shell><HowItWorks /></Shell> }, // NEW
  { path: "/analyze", element: <Shell><Analyze /></Shell> },
  { path: "/usage", element: <Shell><Usage /></Shell> },
  { path: "/pricing", element: <Shell><Pricing /></Shell> },
  { path: "*", element: <Shell><NotFound /></Shell> },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);