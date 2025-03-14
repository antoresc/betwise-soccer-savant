
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FootballAPI, Team } from "@/services/footballApi";
import { useToast } from "@/components/ui/use-toast";
import { useCompetition } from "@/contexts/CompetitionContext";

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { activeCompetition } = useCompetition();
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await FootballAPI.getTeams(activeCompetition.id);
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
        toast({
          title: "Error loading teams",
          description: "There was a problem loading the teams data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [toast, activeCompetition]);

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
            <h1 className="text-3xl font-bold tracking-tight">
              {activeCompetition.name} <span className="text-bet-primary">{activeCompetition.logo}</span> Teams
            </h1>
            <p className="text-muted-foreground">
              Browse teams, check stats, and analyze performance for better betting decisions.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-lg bg-muted animate-pulse-slow"
                ></div>
              ))}
            </div>
          ) : teams.length > 0 ? (
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
                        <Badge variant="outline">{activeCompetition.name}</Badge>
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
                          <span className="text-2xl font-semibold">{Math.round(team.winRate * 10)}</span>
                          <span className="text-xs text-muted-foreground">Wins</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-semibold">{Math.round((1 - team.winRate) * 5)}</span>
                          <span className="text-xs text-muted-foreground">Draws</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-semibold">{Math.round((1 - team.winRate) * 5)}</span>
                          <span className="text-xs text-muted-foreground">Losses</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">Goal Difference:</span>
                        <span className="font-medium">
                          {Math.round((team.goalsScoredAvg - team.goalsConcededAvg) * 10)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No teams found for {activeCompetition.name}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
