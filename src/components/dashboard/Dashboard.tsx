import { Church, User, DollarSign, Users } from "lucide-react";
import StatsCard from "./StatsCard";
import { mockChurches, mockPastors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalMembers = mockChurches.reduce((sum, church) => sum + church.members, 0);
  const totalIncome = mockChurches.reduce((sum, church) => sum + church.income, 0);
  const averageMembers = Math.round(totalMembers / mockChurches.length);
  const averageIncome = Math.round(totalIncome / mockChurches.length);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fact-Check Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze church and pastor information
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Churches"
          value={mockChurches.length}
          subtitle="Active organizations"
          icon={Church}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Pastors"
          value={mockPastors.length}
          subtitle="Registered leaders"
          icon={User}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Members"
          value={totalMembers.toLocaleString()}
          subtitle={`Avg: ${averageMembers.toLocaleString()} per church`}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Total Income"
          value={`$${(totalIncome / 1000000).toFixed(1)}M`}
          subtitle={`Avg: $${(averageIncome / 1000000).toFixed(1)}M per church`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="h-5 w-5 text-primary" />
              Recent Churches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockChurches.slice(0, 3).map((church) => (
              <div key={church.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{church.name}</p>
                  <p className="text-sm text-muted-foreground">{church.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{church.members.toLocaleString()} members</p>
                  <p className="text-xs text-muted-foreground">
                    ${(church.income / 1000000).toFixed(1)}M income
                  </p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/churches">View All Churches</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Recent Pastors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPastors.slice(0, 3).map((pastor) => (
              <div key={pastor.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{pastor.name}</p>
                  <p className="text-sm text-muted-foreground">{pastor.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{pastor.age} years old</p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/pastors">View All Pastors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;