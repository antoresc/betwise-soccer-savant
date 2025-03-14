
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, Target, BarChart3, Trophy, ChevronLeft } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Matches",
      path: "/matches",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Teams",
      path: "/teams",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Betting Tips",
      path: "/tips",
      icon: <Target className="h-5 w-5" />,
    },
    {
      name: "Statistics",
      path: "/statistics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Competitions",
      path: "/competitions",
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <div className="relative size-8 overflow-hidden rounded-full bg-sidebar-primary">
            <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm">
              BS
            </div>
          </div>
          <span className="text-xl">BetWise</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
          onClick={onClose}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </div>
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                window.location.pathname === item.path && "bg-sidebar-accent text-sidebar-foreground"
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <h3 className="font-medium text-sidebar-foreground mb-2">Pro Tip</h3>
            <p className="text-sm text-sidebar-foreground/80">
              Check our daily betting tips for the highest probability picks based on statistical analysis.
            </p>
            <Button
              variant="ghost"
              className="mt-3 w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
              asChild
            >
              <Link to="/tips">View Tips</Link>
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
