
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Match } from "@/services/footballApi";
import { cn } from "@/lib/utils";
import { Dices, TrendingUp, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface MatchDetailStatsProps {
  match: Match;
}

const MatchDetailStats: React.FC<MatchDetailStatsProps> = ({ match }) => {
  const homeTeam = match.homeTeam;
  const awayTeam = match.awayTeam;
  const isMobile = useIsMobile();
  
  const formatStat = (home: number, away: number, reverse = false) => {
    // For stats where lower is better (like goalsConcededAvg), set reverse to true
    const homeClass = !reverse 
      ? (home > away ? "stat-improvement" : "stat-decline") 
      : (home < away ? "stat-improvement" : "stat-decline");
    
    const awayClass = !reverse 
      ? (away > home ? "stat-improvement" : "stat-decline") 
      : (away < home ? "stat-improvement" : "stat-decline");
    
    return (
      <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
        <div className={homeClass}>{home.toFixed(2)}</div>
        <div className="text-xs sm:text-sm font-medium text-muted-foreground mx-2">vs</div>
        <div className={awayClass}>{away.toFixed(2)}</div>
      </div>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="px-3 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Team Comparison</CardTitle>
        <CardDescription>Statistical comparison between teams</CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats" className="flex items-center gap-1 px-1 sm:px-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline-block">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="h2h" className="flex items-center gap-1 px-1 sm:px-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline-block">Head to Head</span>
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-1 px-1 sm:px-2">
              <Dices className="h-4 w-4" />
              <span className="hidden sm:inline-block">Prediction</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="mt-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
              <div className="col-span-1 text-center">
                <span className="text-xs sm:text-sm font-medium overflow-hidden text-ellipsis">{homeTeam.name}</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs sm:text-sm font-medium">Stat</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs sm:text-sm font-medium overflow-hidden text-ellipsis">{awayTeam.name}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="col-span-1 text-center text-xs sm:text-sm">{homeTeam.winRate * 100}%</div>
                <div className="col-span-1 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                  Win Rate
                </div>
                <div className="col-span-1 text-center text-xs sm:text-sm">{awayTeam.winRate * 100}%</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {formatStat(homeTeam.goalsScoredAvg, awayTeam.goalsScoredAvg)}
                <div className="col-span-1 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                  Goals Scored Avg
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {formatStat(homeTeam.goalsConcededAvg, awayTeam.goalsConcededAvg, true)}
                <div className="col-span-1 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                  Goals Conceded Avg
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {formatStat(homeTeam.cleanSheets, awayTeam.cleanSheets)}
                <div className="col-span-1 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                  Clean Sheets
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {formatStat(homeTeam.strengthIndex, awayTeam.strengthIndex)}
                <div className="col-span-1 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                  Strength Index
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="h2h" className="mt-4">
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
              <div className="text-center bg-muted p-2 sm:p-3 rounded-md w-16 sm:w-20">
                <div className="text-lg sm:text-xl font-bold">{match.h2h.homeWins}</div>
                <div className="text-xs text-muted-foreground">{homeTeam.shortName} Wins</div>
              </div>
              <div className="text-center bg-muted p-2 sm:p-3 rounded-md w-16 sm:w-20">
                <div className="text-lg sm:text-xl font-bold">{match.h2h.draws}</div>
                <div className="text-xs text-muted-foreground">Draws</div>
              </div>
              <div className="text-center bg-muted p-2 sm:p-3 rounded-md w-16 sm:w-20">
                <div className="text-lg sm:text-xl font-bold">{match.h2h.awayWins}</div>
                <div className="text-xs text-muted-foreground">{awayTeam.shortName} Wins</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-medium">Recent Meetings</h4>
              {match.h2h.lastMatches.map((h2hMatch, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">{h2hMatch.homeTeam}</span>
                    <span className="mx-1 sm:mx-2 font-bold">{h2hMatch.homeScore} - {h2hMatch.awayScore}</span>
                    <span className="font-medium">{h2hMatch.awayTeam}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{h2hMatch.date}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="prediction" className="mt-4">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium">Prediction Confidence</span>
                <span 
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    match.predictionConfidence >= 70 ? "bg-bet-success/20 text-bet-success" :
                    match.predictionConfidence >= 50 ? "bg-bet-warning/20 text-bet-warning" :
                    "bg-bet-danger/20 text-bet-danger"
                  )}
                >
                  {match.predictionConfidence}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={cn(
                    "h-1.5 rounded-full",
                    match.predictionConfidence >= 70 ? "bg-bet-success" :
                    match.predictionConfidence >= 50 ? "bg-bet-warning" :
                    "bg-bet-danger"
                  )}
                  style={{ width: `${match.predictionConfidence}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Recommended Bet</span>
                <span className="text-xs sm:text-sm font-bold text-bet-accent">{match.recommendedBet}</span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-xs sm:text-sm font-medium mb-2">Key Statistics</h4>
                <ul className="space-y-2">
                  {match.keyStats.map((stat, index) => (
                    <li key={index} className="text-xs sm:text-sm flex items-start">
                      <span className="text-bet-accent mr-2">•</span>
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MatchDetailStats;
