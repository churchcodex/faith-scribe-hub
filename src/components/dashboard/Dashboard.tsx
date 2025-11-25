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

  // Count clergy by type
  const clergyStats = mockPastors.reduce((acc, pastor) => {
    const type = pastor.clergy_type || "Pastor";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bishops = clergyStats.Bishop || 0;
  const mothers = clergyStats.Mother || 0;
  const sisters = clergyStats.Sister || 0;
  const reverends = clergyStats.Reverend || 0;
  const pastors = clergyStats.Pastor || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-700 dark:to-accent-700 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Fact-Check Dashboard</h1>
        <p className="text-primary-50 dark:text-primary-100 mt-2">Monitor and analyze church and pastor information</p>
      </div>

      {/* Main Stats Grid - 2 cols on mobile, 4 on desktop */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Churches"
          value={mockChurches.length}
          subtitle="Active organizations"
          icon={Church}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Clergy"
          value={mockPastors.length}
          subtitle="All registered clergy"
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

      {/* Clergy Type Stats */}
      <div>
        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-4">Clergy by Type</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 border-2 border-primary-300 dark:border-primary-700 rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-primary-900 dark:text-primary-100">{bishops}</div>
            <div className="text-sm text-primary-700 dark:text-primary-300">Bishops</div>
          </div>
          <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900 dark:to-secondary-800 border-2 border-secondary-300 dark:border-secondary-700 rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">{mothers}</div>
            <div className="text-sm text-secondary-700 dark:text-secondary-300">Mothers</div>
          </div>
          <div className="bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800 border-2 border-accent-300 dark:border-accent-700 rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-accent-900 dark:text-accent-100">{sisters}</div>
            <div className="text-sm text-accent-700 dark:text-accent-300">Sisters</div>
          </div>
          <div className="bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 border-2 border-primary-300 dark:border-primary-700 rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-primary-900 dark:text-primary-100">{reverends}</div>
            <div className="text-sm text-primary-700 dark:text-primary-300">Reverends</div>
          </div>
          <div className="bg-gradient-to-br from-secondary-200 to-accent-100 dark:from-secondary-800 dark:to-accent-900 border-2 border-secondary-300 dark:border-secondary-700 rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">{pastors}</div>
            <div className="text-sm text-secondary-700 dark:text-secondary-300">Pastors</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              Recent Churches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockChurches.slice(0, 3).map((church) => (
              <div
                key={church.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-lg border border-primary-200 dark:border-primary-800 hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-medium text-primary-900 dark:text-primary-100">{church.name}</p>
                  <p className="text-sm text-secondary-700 dark:text-secondary-300">{church.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-accent-800 dark:text-accent-200">
                    {church.members.toLocaleString()} members
                  </p>
                  <p className="text-xs text-text-600 dark:text-text-400">
                    ${(church.income / 1000000).toFixed(1)}M income
                  </p>
                </div>
              </div>
            ))}
            <Button
              asChild
              variant="outline"
              className="w-full border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900"
            >
              <Link to="/churches">View All Churches</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              Recent Pastors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPastors.slice(0, 3).map((pastor) => (
              <div
                key={pastor.id}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-secondary-50 to-accent-50 dark:from-secondary-950 dark:to-accent-950 rounded-lg border border-secondary-200 dark:border-secondary-800 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-secondary-500 dark:from-accent-600 dark:to-secondary-700 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">{pastor.name}</p>
                  <p className="text-sm text-text-700 dark:text-text-300">{pastor.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-accent-800 dark:text-accent-200">{pastor.age} years old</p>
                </div>
              </div>
            ))}
            <Button
              asChild
              variant="outline"
              className="w-full border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-900"
            >
              <Link to="/pastors">View All Pastors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
