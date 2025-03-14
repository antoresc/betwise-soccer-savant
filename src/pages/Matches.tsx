
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { FootballAPI, Match } from "@/services/footballApi";
import MatchCard from "@/components/matches/MatchCard";
import { useToast } from "@/components/ui/use-toast";
import { useCompetition } from "@/contexts/CompetitionContext";

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { activeCompetition } = useCompetition();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await FootballAPI.getUpcomingMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        toast({
          title: "Error loading matches",
          description: "There was a problem loading the match data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [toast, activeCompetition]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {activeCompetition.name} <span className="text-bet-primary">{activeCompetition.logo}</span> Matches
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Browse and analyze upcoming {activeCompetition.name} matches
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 sm:h-72 md:h-80 rounded-lg bg-muted animate-pulse-slow"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Matches;
