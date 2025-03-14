
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { FootballAPI, Match, Player, BettingTip } from "@/services/footballApi";
import StatsOverviewCard from "@/components/dashboard/StatsOverviewCard";
import UpcomingMatchesCard from "@/components/dashboard/UpcomingMatchesCard";
import BettingTipsCard from "@/components/dashboard/BettingTipsCard";
import TopPlayersCard from "@/components/dashboard/TopPlayersCard";
import { useToast } from "@/components/ui/use-toast";
import { useCompetition } from "@/contexts/CompetitionContext";

const Index = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tips, setTips] = useState<BettingTip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { activeCompetition } = useCompetition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel, passing competition ID to filter data
        const [matchesData, playersData, tipsData] = await Promise.all([
          FootballAPI.getUpcomingMatches(activeCompetition.id),
          FootballAPI.getPlayers(activeCompetition.id),
          FootballAPI.getBettingTips(activeCompetition.id)
        ]);
        
        setMatches(matchesData);
        setPlayers(playersData);
        setTips(tipsData);
        
        toast({
          title: "Data loaded successfully",
          description: `Latest ${activeCompetition.name} data has been retrieved.`,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the latest data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast, activeCompetition]);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="relative overflow-hidden p-4 rounded-lg bg-gradient-to-r from-[#0D0630] via-[#18314F] to-[#384E77] animate-gradient-shift">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Welcome to BetWise <span className="text-accent animate-pulse-slow">{activeCompetition.logo}</span>
            </h1>
            <p className="text-sm md:text-base text-white/80 mt-1 max-w-2xl">
              Your smart football betting assistant for {activeCompetition.name} powered by advanced statistics
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#384E77]/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0D0630]/30 rounded-full filter blur-2xl -translate-x-1/4 translate-y-1/3"></div>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatsOverviewCard />
        </div>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <UpcomingMatchesCard matches={matches} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <BettingTipsCard tips={tips} />
          </div>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <TopPlayersCard players={players} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
