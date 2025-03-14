
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FootballAPI } from "@/services/footballApi";
import { useQuery } from "@tanstack/react-query";

const Statistics = () => {
  const { data: teams = [], isLoading: isLoadingTeams } = useQuery({
    queryKey: ["teams"],
    queryFn: FootballAPI.getTeams,
  });

  const { data: players = [], isLoading: isLoadingPlayers } = useQuery({
    queryKey: ["players"],
    queryFn: FootballAPI.getPlayers,
  });

  // Goals per team data
  const goalsPerTeamData = teams.map((team) => ({
    name: team.shortName,
    goals: team.goalsScoredAvg * 10, // Multiplying by 10 to get total goals
  }));

  // Win rate data
  const winRateData = teams.map((team) => ({
    name: team.shortName,
    winRate: team.winRate * 100,
  }));

  // Clean sheets data
  const cleanSheetsData = teams.map((team) => ({
    name: team.shortName,
    value: team.cleanSheets,
  }));

  // Player stats data
  const playerStatsData = players.map((player) => ({
    name: player.name,
    goals: player.goals,
    assists: player.assists,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Comprehensive football statistics and performance metrics
          </p>
        </div>

        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team">Team Statistics</TabsTrigger>
            <TabsTrigger value="player">Player Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Goals Per Team</CardTitle>
                  <CardDescription>Average goals scored per team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={goalsPerTeamData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="goals" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Win Rate</CardTitle>
                  <CardDescription>Win percentage per team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={winRateData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="winRate" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clean Sheets</CardTitle>
                  <CardDescription>Number of clean sheets per team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cleanSheetsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {cleanSheetsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="player" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Players - Goals & Assists</CardTitle>
                <CardDescription>Goals and assists comparison for top players</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={playerStatsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="goals" fill="#8884d8" name="Goals" />
                      <Bar dataKey="assists" fill="#82ca9d" name="Assists" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Statistics;
