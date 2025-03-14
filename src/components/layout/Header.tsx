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
const Header: React.FC<HeaderProps> = ({
  toggleSidebar
}) => {
  const location = useLocation();
  const {
    activeCompetition,
    setActiveCompetition
  } = useCompetition();
  const handleCompetitionChange = (competition: typeof competitions[0]) => {
    setActiveCompetition(competition);
    toast({
      title: "League Changed",
      description: `Switched to ${competition.name}`
    });
  };
  return <header className="sticky top-0 z-40 w-full bg-background/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20 border-b border-[#384E77]/20 animate-fade-in">
      <div className="container h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden transition-transform hover:scale-105" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link to="/" className="flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-105 group">
            <div className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-[#0D0630] to-[#384E77] animate-pulse-slow group-hover:animate-glow">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                BS
              </div>
            </div>
            <span className="hidden md:inline-block text-xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-white group-hover:to-foreground/90 transition-all duration-500">BetWise</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto font-medium text-sm transition-transform hover:scale-105 hover:bg-transparent">
                <span className="text-base mr-1">{activeCompetition.logo}</span>
                <span className={cn("transition-colors hover:text-foreground/80", location.pathname === "/competitions" ? "text-foreground" : "text-foreground/60")}>
                  {activeCompetition.name}
                </span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#18314F]/90 backdrop-blur-lg border border-[#384E77]/30 animate-fade-in">
              {competitions.map(competition => <DropdownMenuItem key={competition.id} onClick={() => handleCompetitionChange(competition)} className="cursor-pointer transition-all duration-200 hover:bg-[#384E77]/50 hover:translate-x-1">
                  <span className="text-base mr-2">{competition.logo}</span>
                  <span>{competition.name}</span>
                </DropdownMenuItem>)}
              <DropdownMenuItem asChild>
                <Link to="/competitions" className="cursor-pointer w-full transition-all duration-200 hover:bg-[#384E77]/50 hover:translate-x-1">
                  <span className="text-sm">View All Leagues</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>;
};
export default Header;