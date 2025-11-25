import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 border-primary-200 dark:border-primary-800">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-primary-700 dark:text-primary-300 truncate">{title}</p>
            <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
              <p className="text-lg sm:text-2xl font-bold text-primary-900 dark:text-primary-100">{value}</p>
              {trend && (
                <span className={`text-xs font-medium ${trend.isPositive ? "text-success" : "text-destructive"}`}>
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1 leading-tight">{subtitle}</p>
            )}
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-secondary-400 to-accent-500 rounded-lg flex items-center justify-center ml-2 flex-shrink-0 shadow-md">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
