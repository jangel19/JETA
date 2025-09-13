import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-4 px-4 md:px-8">
        <Link to="/" className="font-semibold tracking-tight">
          JETA <span className="text-primary">AI</span>
        </Link>

        <nav className="ml-6 hidden gap-6 text-sm md:flex">
          <NavLink to="/analyze">Analyze</NavLink>
          <NavLink to="/how-it-works">How it works</NavLink>
          <NavLink to="/usage">Usage</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <a href="#">Docs</a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}