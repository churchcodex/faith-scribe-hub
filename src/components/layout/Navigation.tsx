import { Link, useLocation } from "react-router-dom";
import { Church, User, BarChart3, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: BarChart3, label: "Dashboard" },
    { to: "/churches", icon: Church, label: "Churches" },
    { to: "/pastors", icon: User, label: "Pastors" },
    { to: "/map", icon: Map, label: "Map View" },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">FactCheck</h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted-foreground"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;