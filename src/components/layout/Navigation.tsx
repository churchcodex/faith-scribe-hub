import { Link, useLocation } from "react-router-dom";
import { Church, User, BarChart3, Map as MapIcon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: BarChart3, label: "Dashboard" },
    { to: "/churches", icon: Church, label: "Churches" },
    { to: "/pastors", icon: User, label: "Pastors" },
    { to: "/map", icon: MapIcon, label: "Map View" },
  ];

  const NavLink = ({ item, onClick }: { item: (typeof navItems)[0]; onClick?: () => void }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.to;

    return (
      <Link
        to={item.to}
        onClick={onClick}
        className={cn(
          "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
          isActive
            ? "border-b-2 border-accent-500 text-primary-700 dark:text-primary-300 md:border-b-2 md:border-accent-500"
            : "text-text-600 dark:text-text-400 hover:text-primary-700 dark:hover:text-primary-300 hover:border-b-2 hover:border-secondary-400 dark:hover:border-secondary-600"
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        {item.label}
      </Link>
    );
  };

  const MobileNavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.to;

    return (
      <Link
        to={item.to}
        onClick={() => setIsOpen(false)}
        className={cn(
          "flex items-center px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg mx-2",
          isActive
            ? "bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-900 dark:text-primary-100 border-l-4 border-accent-500"
            : "text-text-700 dark:text-text-300 hover:text-primary-800 dark:hover:text-primary-200 hover:bg-secondary-100 dark:hover:bg-secondary-900"
        )}
      >
        <Icon className="mr-3 h-5 w-5" />
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">FactCheck</h1>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.to} item={item} />
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <div className="flex items-center justify-between">
                    <DrawerTitle className="text-xl font-bold text-primary">FactCheck</DrawerTitle>
                    <DrawerClose asChild>
                      <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted">
                        <X className="h-6 w-6" />
                      </button>
                    </DrawerClose>
                  </div>
                </DrawerHeader>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <MobileNavLink key={item.to} item={item} />
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
