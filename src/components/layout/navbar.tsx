
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/directory",
    label: "Directory",
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/about",
    label: "About",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out-cubic py-4",
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-subtle"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <div className="h-10 w-10 rounded-full bg-sunflower-400 flex items-center justify-center">
              <span className="font-bold text-white">SS</span>
            </div>
            <div className="font-semibold text-lg tracking-tight">
              Sunflower Spectrum
            </div>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary link-underline",
                  location.pathname === route.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {route.label}
              </Link>
            ))}
            <Button size="sm" className="ml-4">
              Contact Us
            </Button>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2 animate-fade-in">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors hover:text-primary",
                  location.pathname === route.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {route.label}
              </Link>
            ))}
            <Button size="sm" className="mt-2 w-full">
              Contact Us
            </Button>
          </nav>
        )}
      </Container>
    </header>
  );
}
