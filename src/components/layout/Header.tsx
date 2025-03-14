
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useCompetition, competitions } from "@/contexts/CompetitionContext";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { activeCompetition, setActiveCompetition } = useCompetition();
  
  const handleCompetitionChange = (competition: typeof competitions[0]) => {
    setActiveCompetition(competition);
    toast({
      title: "League Changed",
      description: `Switched to ${competition.name}`,
    });
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-transform hover:scale-105"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold transition-transform hover:scale-105"
          >
            <div className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-bet-primary to-bet-accent animate-pulse-slow">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                BS
              </div>
            </div>
            <span className="hidden md:inline-block text-xl">BetWise</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link 
            to="/matches" 
            className={cn(
              "transition-colors hover:text-foreground/80 relative transition-all duration-200 hover:scale-105",
              location.pathname === "/matches" 
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent after:content-['']" 
                : "text-foreground/60"
            )}
          >
            Matches
          </Link>
          <Link 
            to="/teams" 
            className={cn(
              "transition-colors hover:text-foreground/80 relative transition-all duration-200 hover:scale-105",
              location.pathname === "/teams" 
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent after:content-['']" 
                : "text-foreground/60"
            )}
          >
            Teams
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto font-medium text-sm transition-transform hover:scale-105">
                <span className="text-base mr-1">{activeCompetition.logo}</span>
                <span className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === "/competitions" ? "text-foreground" : "text-foreground/60"
                )}>
                  {activeCompetition.name}
                </span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover animate-fade-in">
              {competitions.map((competition) => (
                <DropdownMenuItem 
                  key={competition.id}
                  onClick={() => handleCompetitionChange(competition)}
                  className="cursor-pointer transition-colors hover:bg-accent/20"
                >
                  <span className="text-base mr-2">{competition.logo}</span>
                  <span>{competition.name}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link to="/competitions" className="cursor-pointer w-full transition-colors hover:bg-accent/20">
                  <span className="text-sm">View All Leagues</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
