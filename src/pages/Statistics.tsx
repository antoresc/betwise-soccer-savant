
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { FootballAPI } from "@/services/footballApi";
import { useQuery } from "@tanstack/react-query";
import { useCompetition } from "@/contexts/CompetitionContext";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const Statistics = () => {
  const { activeCompetition } = useCompetition();

  const { data: teams = [], isLoading: isLoadingTeams } = useQuery({
    queryKey: ["teams", activeCompetition.id],
    queryFn: () => FootballAPI.getTeams(activeCompetition.id),
  });

  const { data: players = [], isLoading: isLoadingPlayers } = useQuery({
    queryKey: ["players", activeCompetition.id],
    queryFn: () => FootballAPI.getPlayers(activeCompetition.id),
  });

  // Goals per team data
  const goalsPerTeamData = teams.map((team) => ({
    name: team.shortName,
    goals: team.goalsScoredAvg * 10, // Multiplying by 10 to get total goals
  }));

  // Win rate data
  const winRateData = teams.map((team) => ({
    name: team.shortName,
    winRate: Math.round(team.winRate * 100), // Convert to percentage
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

  // Team performance radar data
  const topTeams = [...teams].sort((a, b) => b.winRate - a.winRate).slice(0, 5);
  const radarData = [
    { subject: 'Win Rate', A: 0, B: 0, C: 0, D: 0, E: 0 },
    { subject: 'Goals Scored', A: 0, B: 0, C: 0, D: 0, E: 0 },
    { subject: 'Clean Sheets', A: 0, B: 0, C: 0, D: 0, E: 0 },
    { subject: 'Defense', A: 0, B: 0, C: 0, D: 0, E: 0 },
    { subject: 'Strength', A: 0, B: 0, C: 0, D: 0, E: 0 },
  ];

  // Populate radar data if teams exist
  if (topTeams.length) {
    for (let i = 0; i < topTeams.length; i++) {
      const team = topTeams[i];
      const letter = String.fromCharCode(65 + i); // A, B, C, D, E
      
      radarData[0][letter] = Math.round(team.winRate * 100);
      radarData[1][letter] = Math.round(team.goalsScoredAvg * 10);
      radarData[2][letter] = team.cleanSheets;
      radarData[3][letter] = Math.round((1 - team.goalsConcededAvg) * 10);
      radarData[4][letter] = Math.round(team.strengthIndex * 10);
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  const RADAR_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {activeCompetition.name} <span className="text-bet-primary">{activeCompetition.logo}</span> Statistics
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Comprehensive {activeCompetition.name} statistics and performance metrics
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
                      <BarChart
                        data={winRateData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="winRate" fill="#82ca9d" name="Win Rate %" />
                      </BarChart>
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

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Teams Performance</CardTitle>
                  <CardDescription>Multi-factor comparison of top teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        {topTeams.map((team, index) => (
                          <Radar 
                            key={team.id}
                            name={team.shortName} 
                            dataKey={String.fromCharCode(65 + index)} 
                            stroke={RADAR_COLORS[index % RADAR_COLORS.length]} 
                            fill={RADAR_COLORS[index % RADAR_COLORS.length]} 
                            fillOpacity={0.6} 
                          />
                        ))}
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="player" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
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
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="goals" fill="#8884d8" name="Goals" />
                        <Bar dataKey="assists" fill="#82ca9d" name="Assists" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Statistics;
