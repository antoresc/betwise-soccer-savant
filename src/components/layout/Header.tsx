
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold"
          >
            <div className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-bet-primary to-bet-accent">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                BS
              </div>
            </div>
            <span className="hidden md:inline-block text-xl">BetWise</span>
          </Link>
        </div>
        
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search matches, teams..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link 
            to="/matches" 
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname === "/matches" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Matches
          </Link>
          <Link 
            to="/teams" 
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname === "/teams" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Teams
          </Link>
          <Link 
            to="/tips" 
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname === "/tips" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Betting Tips
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
