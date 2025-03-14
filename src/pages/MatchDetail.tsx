
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { FootballAPI, Match, Player } from "@/services/footballApi";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Calendar, Clock, Trophy } from "lucide-react";
import { format, parseISO } from "date-fns";
import MatchDetailStats from "@/components/matches/MatchDetailStats";
import { Separator } from "@/components/ui/separator";

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [homePlayers, setHomePlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMatchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const matchId = parseInt(id);
        const matchData = await FootballAPI.getMatchById(matchId);

        if (!matchData) {
          toast({
            title: "Match not found",
            description: "The requested match could not be found.",
            variant: "destructive",
          });
          return;
        }

        setMatch(matchData);

        // Fetch players for both teams
        const [homeTeamPlayers, awayTeamPlayers] = await Promise.all([
          FootballAPI.getPlayersByTeam(matchData.homeTeam.id),
          FootballAPI.getPlayersByTeam(matchData.awayTeam.id),
        ]);

        setHomePlayers(homeTeamPlayers);
        setAwayPlayers(awayTeamPlayers);
      } catch (error) {
        console.error("Failed to fetch match data:", error);
        toast({
          title: "Error loading match details",
          description: "There was a problem loading the match details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [id, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="h-20 rounded-lg bg-muted animate-pulse-slow mb-8"></div>
          <div className="h-96 rounded-lg bg-muted animate-pulse-slow"></div>
        </div>
      </Layout>
    );
  }

  if (!match) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Match not found</h2>
          <p className="text-muted-foreground mb-6">
            The match you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/matches">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Matches
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Match Analysis</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/matches">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Matches
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden border shadow-md mb-8">
          <div className="match-card-gradient py-4 px-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">{match.competition}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{format(parseISO(match.date), "dd MMMM yyyy")}</span>
                <Clock className="h-4 w-4 ml-1" />
                <span>{match.time}</span>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col items-center">
                <img 
                  src={match.homeTeam.logo} 
                  alt={match.homeTeam.name}
                  className="h-20 w-20 object-contain mb-3" 
                />
                <span className="text-lg font-medium">{match.homeTeam.name}</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm px-2 py-0.5 bg-muted rounded-full">Form: {match.homeTeam.form}</span>
                  <span className="text-sm px-2 py-0.5 bg-muted rounded-full">
                    Rating: {match.homeTeam.strengthIndex}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-center mx-4">
                <div className="text-2xl font-bold mb-4">VS</div>
                <div className="flex gap-6 text-lg">
                  <div className="text-center w-16">
                    <div className="font-semibold">{match.homeOdds.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">Home</div>
                  </div>
                  <div className="text-center w-16">
                    <div className="font-semibold">{match.drawOdds.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">Draw</div>
                  </div>
                  <div className="text-center w-16">
                    <div className="font-semibold">{match.awayOdds.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">Away</div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-sm font-medium">Recommended Bet</div>
                  <div className="text-lg font-bold text-bet-accent mt-1">{match.recommendedBet}</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <img 
                  src={match.awayTeam.logo} 
                  alt={match.awayTeam.name}
                  className="h-20 w-20 object-contain mb-3" 
                />
                <span className="text-lg font-medium">{match.awayTeam.name}</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm px-2 py-0.5 bg-muted rounded-full">Form: {match.awayTeam.form}</span>
                  <span className="text-sm px-2 py-0.5 bg-muted rounded-full">
                    Rating: {match.awayTeam.strengthIndex}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MatchDetailStats match={match} />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Key Players</h2>
          <Separator className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{match.homeTeam.name}</h3>
              <div className="space-y-4">
                {homePlayers.slice(0, 3).map((player) => (
                  <Card key={player.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="h-14 w-14 rounded-full object-cover border" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{player.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-muted">{player.position}</span>
                            <span 
                              className={
                                player.form === "↑" ? "text-bet-success" :
                                player.form === "↓" ? "text-bet-danger" :
                                "text-muted-foreground"
                              }
                            >
                              {player.form}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">{player.formReason}</div>
                          <div className="mt-2 flex items-center gap-3 text-sm">
                            <span>Goals: {player.goals}</span>
                            <span>•</span>
                            <span>Assists: {player.assists}</span>
                            <span>•</span>
                            <span>Rating: {player.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{match.awayTeam.name}</h3>
              <div className="space-y-4">
                {awayPlayers.slice(0, 3).map((player) => (
                  <Card key={player.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={player.image} 
                          alt={player.name} 
                          className="h-14 w-14 rounded-full object-cover border" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{player.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-muted">{player.position}</span>
                            <span 
                              className={
                                player.form === "↑" ? "text-bet-success" :
                                player.form === "↓" ? "text-bet-danger" :
                                "text-muted-foreground"
                              }
                            >
                              {player.form}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">{player.formReason}</div>
                          <div className="mt-2 flex items-center gap-3 text-sm">
                            <span>Goals: {player.goals}</span>
                            <span>•</span>
                            <span>Assists: {player.assists}</span>
                            <span>•</span>
                            <span>Rating: {player.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MatchDetail;
