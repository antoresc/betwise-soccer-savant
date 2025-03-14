
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { FootballAPI, Match, Player, BettingTip } from "@/services/footballApi";
import StatsOverviewCard from "@/components/dashboard/StatsOverviewCard";
import UpcomingMatchesCard from "@/components/dashboard/UpcomingMatchesCard";
import BettingTipsCard from "@/components/dashboard/BettingTipsCard";
import TopPlayersCard from "@/components/dashboard/TopPlayersCard";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tips, setTips] = useState<BettingTip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [matchesData, playersData, tipsData] = await Promise.all([
          FootballAPI.getUpcomingMatches(),
          FootballAPI.getPlayers(),
          FootballAPI.getBettingTips()
        ]);
        
        setMatches(matchesData);
        setPlayers(playersData);
        setTips(tipsData);
        
        toast({
          title: "Data loaded successfully",
          description: "Latest match and betting data has been retrieved.",
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
  }, [toast]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome to BetWise</h1>
          <p className="text-muted-foreground mt-1">
            Your smart football betting assistant powered by advanced statistics
          </p>
        </div>
        
        <StatsOverviewCard />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UpcomingMatchesCard matches={matches} />
          </div>
          <div>
            <BettingTipsCard tips={tips} />
          </div>
        </div>
        
        <div>
          <TopPlayersCard players={players} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
