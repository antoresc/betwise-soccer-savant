
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { FootballAPI, BettingTip } from "@/services/footballApi";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Target, Calendar, Clock, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Tips = () => {
  const [tips, setTips] = useState<BettingTip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        const data = await FootballAPI.getBettingTips();
        setTips(data);
      } catch (error) {
        console.error("Failed to fetch betting tips:", error);
        toast({
          title: "Error loading betting tips",
          description: "There was a problem loading the betting tips data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, [toast]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Betting Tips</h1>
          <p className="text-muted-foreground mt-1">
            Expert recommendations based on advanced statistical analysis
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-bet-accent" />
              <CardTitle>Daily Tips Overview</CardTitle>
            </div>
            <CardDescription>
              Our AI system analyzes thousands of data points to provide the most accurate betting predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Tips</span>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold">{tips.length}</span>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg. Odds</span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold">
                    {(tips.reduce((sum, tip) => sum + tip.odds, 0) / (tips.length || 1)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <div className="text-xs px-2 py-0.5 bg-bet-success/20 text-bet-success rounded-full">72%</div>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold">7/10</span>
                  <span className="ml-2 text-xs text-muted-foreground">Last 10 tips</span>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold">Today</span>
                  <span className="ml-2 text-xs text-muted-foreground">09:15 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-lg bg-muted animate-pulse-slow"
              ></div>
            ))
          ) : (
            tips.map((tip) => (
              <Card key={tip.matchId} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center text-sm">
                          <Calendar className="h-4 w-4 mb-1 text-muted-foreground" />
                          <span>{format(parseISO(tip.date), "dd MMM")}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{tip.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <img 
                              src={tip.homeTeamLogo} 
                              alt={tip.homeTeam} 
                              className="h-10 w-10 object-contain mb-1" 
                            />
                            <span className="text-sm font-medium">{tip.homeTeam}</span>
                          </div>
                          
                          <span className="text-sm font-medium">vs</span>
                          
                          <div className="flex flex-col items-center">
                            <img 
                              src={tip.awayTeamLogo} 
                              alt={tip.awayTeam} 
                              className="h-10 w-10 object-contain mb-1" 
                            />
                            <span className="text-sm font-medium">{tip.awayTeam}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:ml-4 md:border-l md:pl-4 md:border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">Bet Tip:</span>
                          <span className="text-bet-accent font-semibold">{tip.tip}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="px-2 py-0.5 bg-muted rounded-full">
                            Odds: {tip.odds.toFixed(2)}
                          </div>
                          <div 
                            className={cn(
                              "px-2 py-0.5 rounded-full",
                              tip.confidence >= 70 ? "bg-bet-success/20 text-bet-success" :
                              tip.confidence >= 50 ? "bg-bet-warning/20 text-bet-warning" :
                              "bg-bet-danger/20 text-bet-danger"
                            )}
                          >
                            {tip.confidence}% confidence
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 md:min-w-48">
                      <div className="text-sm text-muted-foreground">{tip.reason}</div>
                      <Button asChild className="mt-1 md:mt-2">
                        <Link to={`/matches/${tip.matchId}`} className="flex items-center justify-center">
                          View Analysis
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tips;
