import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const displayName = (() => {
    if (!user) return "";
    if (user.firstName || user.lastName) return [user.firstName, user.lastName].filter(Boolean).join(" ");
    if (user.name) return user.name;
    const local = (user.email.split("@")[0] || "user").replace(/[._-]+/g, " ").trim();
    return local ? local.charAt(0).toUpperCase() + local.slice(1) : "User";
  })();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-md'
          : 'bg-background/50 backdrop-blur-lg border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                JETA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA / Auth Status */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-2 text-sm text-muted-foreground">
                    Signed in as <span className="ml-1 font-medium text-foreground">{displayName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onSelect={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate('/profile')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      signOut();
                      navigate('/');
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost"><Link to="/signin">Sign In</Link></Button>
                <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/features"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="block text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <ThemeToggle />
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground">
                    Signed in as <span className="font-medium text-foreground">{displayName}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
