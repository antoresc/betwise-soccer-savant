
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Teams = () => {
  // Mock data for teams, which would normally come from an API
  const teams = [
    {
      id: 1,
      name: "Manchester United",
      country: "England",
      league: "Premier League",
      logo: "https://media.api-sports.io/football/teams/33.png",
      form: "WDWLW",
      stats: {
        matches: 38,
        wins: 22,
        draws: 5,
        losses: 11,
        goalsFor: 73,
        goalsAgainst: 44,
      },
    },
    {
      id: 2,
      name: "Liverpool",
      country: "England",
      league: "Premier League",
      logo: "https://media.api-sports.io/football/teams/40.png",
      form: "WWWDL",
      stats: {
        matches: 38,
        wins: 26,
        draws: 8,
        losses: 4,
        goalsFor: 94,
        goalsAgainst: 26,
      },
    },
    {
      id: 3,
      name: "Barcelona",
      country: "Spain",
      league: "La Liga",
      logo: "https://media.api-sports.io/football/teams/529.png",
      form: "WDWWW",
      stats: {
        matches: 38,
        wins: 24,
        draws: 10,
        losses: 4,
        goalsFor: 70,
        goalsAgainst: 36,
      },
    },
    {
      id: 4,
      name: "Real Madrid",
      country: "Spain",
      league: "La Liga",
      logo: "https://media.api-sports.io/football/teams/541.png",
      form: "WWWWD",
      stats: {
        matches: 38,
        wins: 25,
        draws: 9,
        losses: 4,
        goalsFor: 70,
        goalsAgainst: 25,
      },
    },
    {
      id: 5,
      name: "Bayern Munich",
      country: "Germany",
      league: "Bundesliga",
      logo: "https://media.api-sports.io/football/teams/157.png",
      form: "WWWWW",
      stats: {
        matches: 34,
        wins: 26,
        draws: 4,
        losses: 4,
        goalsFor: 97,
        goalsAgainst: 37,
      },
    },
    {
      id: 6,
      name: "PSG",
      country: "France",
      league: "Ligue 1",
      logo: "https://media.api-sports.io/football/teams/85.png",
      form: "WLWDW",
      stats: {
        matches: 38,
        wins: 27,
        draws: 7,
        losses: 4,
        goalsFor: 89,
        goalsAgainst: 28,
      },
    },
  ];

  // Function to render team form (W, D, L)
  const renderForm = (form: string) => {
    return form.split("").map((result, index) => {
      let bgColor = "";
      switch (result) {
        case "W":
          bgColor = "bg-green-500";
          break;
        case "D":
          bgColor = "bg-yellow-500";
          break;
        case "L":
          bgColor = "bg-red-500";
          break;
        default:
          bgColor = "bg-gray-500";
      }
      return (
        <span
          key={index}
          className={`inline-block w-6 h-6 rounded-full ${bgColor} text-white text-xs font-medium flex items-center justify-center mr-1`}
        >
          {result}
        </span>
      );
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
            <p className="text-muted-foreground">
              Browse teams, check stats, and analyze performance for better betting decisions.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Teams</TabsTrigger>
                <TabsTrigger value="england">England</TabsTrigger>
                <TabsTrigger value="spain">Spain</TabsTrigger>
                <TabsTrigger value="germany">Germany</TabsTrigger>
                <TabsTrigger value="france">France</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <Card key={team.id}>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="w-12 h-12 overflow-hidden">
                        <img
                          src={team.logo}
                          alt={`${team.name} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline">{team.league}</Badge>
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Form:</span>
                          <div className="flex">{renderForm(team.form)}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center pt-2">
                          <div className="flex flex-col">
                            <span className="text-2xl font-semibold">{team.stats.wins}</span>
                            <span className="text-xs text-muted-foreground">Wins</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-2xl font-semibold">{team.stats.draws}</span>
                            <span className="text-xs text-muted-foreground">Draws</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-2xl font-semibold">{team.stats.losses}</span>
                            <span className="text-xs text-muted-foreground">Losses</span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm">Goal Difference:</span>
                          <span className="font-medium">
                            {team.stats.goalsFor - team.stats.goalsAgainst}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="england" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams
                  .filter((team) => team.country === "England")
                  .map((team) => (
                    <Card key={team.id}>
                      {/* The same card content as above */}
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="w-12 h-12 overflow-hidden">
                          <img
                            src={team.logo}
                            alt={`${team.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>
                            <Badge variant="outline">{team.league}</Badge>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Form:</span>
                            <div className="flex">{renderForm(team.form)}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center pt-2">
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.wins}</span>
                              <span className="text-xs text-muted-foreground">Wins</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.draws}</span>
                              <span className="text-xs text-muted-foreground">Draws</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.losses}</span>
                              <span className="text-xs text-muted-foreground">Losses</span>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm">Goal Difference:</span>
                            <span className="font-medium">
                              {team.stats.goalsFor - team.stats.goalsAgainst}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Similar TabsContent for spain, germany, france */}
            <TabsContent value="spain" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams
                  .filter((team) => team.country === "Spain")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="w-12 h-12 overflow-hidden">
                          <img
                            src={team.logo}
                            alt={`${team.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>
                            <Badge variant="outline">{team.league}</Badge>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Form:</span>
                            <div className="flex">{renderForm(team.form)}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center pt-2">
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.wins}</span>
                              <span className="text-xs text-muted-foreground">Wins</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.draws}</span>
                              <span className="text-xs text-muted-foreground">Draws</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.losses}</span>
                              <span className="text-xs text-muted-foreground">Losses</span>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm">Goal Difference:</span>
                            <span className="font-medium">
                              {team.stats.goalsFor - team.stats.goalsAgainst}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="germany" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams
                  .filter((team) => team.country === "Germany")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="w-12 h-12 overflow-hidden">
                          <img
                            src={team.logo}
                            alt={`${team.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>
                            <Badge variant="outline">{team.league}</Badge>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Form:</span>
                            <div className="flex">{renderForm(team.form)}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center pt-2">
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.wins}</span>
                              <span className="text-xs text-muted-foreground">Wins</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.draws}</span>
                              <span className="text-xs text-muted-foreground">Draws</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.losses}</span>
                              <span className="text-xs text-muted-foreground">Losses</span>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm">Goal Difference:</span>
                            <span className="font-medium">
                              {team.stats.goalsFor - team.stats.goalsAgainst}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="france" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams
                  .filter((team) => team.country === "France")
                  .map((team) => (
                    <Card key={team.id}>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="w-12 h-12 overflow-hidden">
                          <img
                            src={team.logo}
                            alt={`${team.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>
                            <Badge variant="outline">{team.league}</Badge>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Form:</span>
                            <div className="flex">{renderForm(team.form)}</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center pt-2">
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.wins}</span>
                              <span className="text-xs text-muted-foreground">Wins</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.draws}</span>
                              <span className="text-xs text-muted-foreground">Draws</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-2xl font-semibold">{team.stats.losses}</span>
                              <span className="text-xs text-muted-foreground">Losses</span>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm">Goal Difference:</span>
                            <span className="font-medium">
                              {team.stats.goalsFor - team.stats.goalsAgainst}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
