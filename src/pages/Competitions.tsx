
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const competitions = [
  {
    id: 1,
    name: "Premier League",
    country: "England",
    logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    teams: 20,
    status: "In Progress",
    currentMatchday: 29,
  },
  {
    id: 2,
    name: "La Liga",
    country: "Spain",
    logo: "🇪🇸",
    teams: 20,
    status: "In Progress",
    currentMatchday: 28,
  },
  {
    id: 3,
    name: "Bundesliga",
    country: "Germany",
    logo: "🇩🇪",
    teams: 18,
    status: "In Progress",
    currentMatchday: 26,
  },
  {
    id: 4,
    name: "Serie A",
    country: "Italy",
    logo: "🇮🇹",
    teams: 20,
    status: "In Progress",
    currentMatchday: 29,
  },
  {
    id: 5,
    name: "Ligue 1",
    country: "France",
    logo: "🇫🇷",
    teams: 20,
    status: "In Progress",
    currentMatchday: 27,
  },
  {
    id: 6,
    name: "Eredivisie",
    country: "Netherlands",
    logo: "🇳🇱",
    teams: 18,
    status: "In Progress",
    currentMatchday: 26,
  },
  {
    id: 7,
    name: "Primeira Liga",
    country: "Portugal",
    logo: "🇵🇹",
    teams: 18,
    status: "In Progress",
    currentMatchday: 26,
  },
  {
    id: 8,
    name: "Championship",
    country: "England",
    logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    teams: 24,
    status: "In Progress",
    currentMatchday: 38,
  },
];

const Competitions = () => {
  const [activeCompetition, setActiveCompetition] = useState<typeof competitions[0]>(competitions[0]);

  const handleCompetitionChange = (competition: typeof competitions[0]) => {
    setActiveCompetition(competition);
    toast({
      title: "League Changed",
      description: `Switched to ${competition.name}`,
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Football Leagues</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span className="text-lg mr-1">{activeCompetition.logo}</span>
                {activeCompetition.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {competitions.map((competition) => (
                <DropdownMenuItem 
                  key={competition.id}
                  onClick={() => handleCompetitionChange(competition)}
                  className="cursor-pointer"
                >
                  <span className="text-lg mr-2">{competition.logo}</span>
                  <span>{competition.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Leagues</TabsTrigger>
            <TabsTrigger value="europe">European</TabsTrigger>
            <TabsTrigger value="domestic">Domestic Leagues</TabsTrigger>
            <TabsTrigger value="cups">Cup Competitions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitions.map((competition) => (
                <CompetitionCard key={competition.id} competition={competition} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="europe">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">European competitions will be available soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="domestic">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Domestic leagues will be available soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="cups">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Cup competitions will be available soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const CompetitionCard = ({ competition }: { competition: typeof competitions[0] }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{competition.name}</CardTitle>
            <CardDescription>{competition.country}</CardDescription>
          </div>
          <div className="text-4xl">{competition.logo}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Teams:</span> {competition.teams}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Matchday:</span> {competition.currentMatchday}
            </div>
          </div>
          <Badge variant={competition.status === "In Progress" ? "default" : "outline"}>
            {competition.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Competitions;
