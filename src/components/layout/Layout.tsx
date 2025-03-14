
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // On mobile, use a drawer for the sidebar
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <DrawerContent className="h-[80vh] max-h-[80vh]">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </DrawerContent>
          </Drawer>
          <main className="flex-1 pt-4 px-4 pb-8 transition-all duration-200 ease-in-out">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // On desktop, use the regular sidebar
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          className={cn(
            "flex-1 pt-4 px-4 pb-12 md:px-6 md:pb-8 md:pt-4 transition-all duration-200 ease-in-out",
            "md:ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
