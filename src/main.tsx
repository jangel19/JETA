import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import Analyze from "./pages/Analyze";
import Usage from "./pages/Usage";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import IndexPage from "./pages/index";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

function Shell({ children }: React.PropsWithChildren) {
  const { pathname } = useLocation();
  return (
    <div className="relative min-h-screen flex flex-col text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 bg-background/80 backdrop-blur-xl mt-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-6 text-sm text-subtle">
          © {new Date().getFullYear()} JETA AI — Built for investors & small developers
        </div>
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <IndexPage />, errorElement: <ErrorPage /> },
  { path: "/how-it-works", element: <Shell><HowItWorks /></Shell>, errorElement: <ErrorPage /> },
  { path: "/analyze", element: <Shell><Analyze /></Shell>, errorElement: <ErrorPage /> },
  { path: "/usage", element: <Shell><Usage /></Shell>, errorElement: <ErrorPage /> },
  { path: "/pricing", element: <Shell><Pricing /></Shell>, errorElement: <ErrorPage /> },
  { path: "/features", element: <Features />, errorElement: <ErrorPage /> },
  { path: "/about", element: <About />, errorElement: <ErrorPage /> },
  { path: "/contact", element: <Contact />, errorElement: <ErrorPage /> },
  { path: "/dashboard", element: <Dashboard />, errorElement: <ErrorPage /> },
  { path: "/signin", element: <Shell><SignIn /></Shell>, errorElement: <ErrorPage /> },
  { path: "/signup", element: <Shell><SignUp /></Shell>, errorElement: <ErrorPage /> },
  { path: "*", element: <Shell><NotFound /></Shell>, errorElement: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);










