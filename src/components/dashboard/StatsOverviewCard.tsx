
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  LineChart,
  Percent,
} from "lucide-react";

const StatsOverviewCard = () => {
  const stats = [
    {
      title: "Prediction Accuracy",
      value: "72%",
      change: "+2.5%",
      increasing: true,
      icon: <TrendingUp className="h-4 w-4 text-bet-success" />,
    },
    {
      title: "Win Rate",
      value: "61%",
      change: "+1.2%",
      increasing: true,
      icon: <BarChart3 className="h-4 w-4 text-bet-success" />,
    },
    {
      title: "ROI",
      value: "18.3%",
      change: "-0.8%",
      increasing: false,
      icon: <Percent className="h-4 w-4 text-bet-danger" />,
    },
    {
      title: "Avg. Odds",
      value: "2.45",
      change: "+0.15",
      increasing: true,
      icon: <LineChart className="h-4 w-4 text-bet-success" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
        <CardTitle className="text-lg sm:text-xl font-bold">Performance Overview</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Your predictions performance over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-lg border bg-card p-2 sm:p-3 text-card-foreground shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">{stat.title}</span>
                {stat.icon}
              </div>
              <div className="mt-1">
                <span className="text-lg sm:text-2xl font-bold">{stat.value}</span>
                <span
                  className={`ml-1 sm:ml-2 text-xs font-medium ${
                    stat.increasing ? "text-bet-success" : "text-bet-danger"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsOverviewCard;
