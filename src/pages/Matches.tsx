
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
        // Pass the competition ID to filter matches
        const data = await FootballAPI.getUpcomingMatches(activeCompetition.id);
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
  }, [toast, activeCompetition]); // Add activeCompetition as a dependency

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="relative overflow-hidden p-4 rounded-lg bg-gradient-to-r from-[#0D0630] via-[#18314F] to-[#384E77] animate-gradient-shift">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {activeCompetition.name} <span className="text-accent animate-pulse-slow">{activeCompetition.logo}</span> Matches
            </h1>
            <p className="text-sm md:text-base text-white/80 mt-1">
              Browse and analyze upcoming {activeCompetition.name} matches
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#384E77]/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0D0630]/30 rounded-full filter blur-2xl -translate-x-1/4 translate-y-1/3"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 sm:h-72 md:h-80 rounded-lg bg-muted animate-pulse-slow"
                style={{ animationDelay: `${i * 100}ms` }}
              ></div>
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {matches.map((match, index) => (
              <div 
                key={match.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 dark-glass rounded-lg animate-fade-in">
            <p className="text-muted-foreground">No matches found for {activeCompetition.name}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Matches;
