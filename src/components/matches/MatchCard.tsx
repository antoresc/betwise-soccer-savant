
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Match } from "@/services/footballApi";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const homeTeam = match.homeTeam;
  const awayTeam = match.awayTeam;

  const confidenceClass = 
    match.predictionConfidence >= 70 ? "bg-bet-success/20 text-bet-success" :
    match.predictionConfidence >= 50 ? "bg-bet-warning/20 text-bet-warning" :
    "bg-bet-danger/20 text-bet-danger";

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className="match-card-gradient py-3 px-4 text-white">
        <div className="flex items-center justify-between">
          <span className="font-medium">{match.competition}</span>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(parseISO(match.date), "dd MMM yyyy")}</span>
            <Clock className="h-3.5 w-3.5 ml-1" />
            <span>{match.time}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <img 
              src={homeTeam.logo} 
              alt={homeTeam.name}
              className="h-14 w-14 object-contain mb-2" 
            />
            <span className="text-sm font-medium">{homeTeam.name}</span>
            <span className="text-xs text-muted-foreground mt-1">Form: {homeTeam.form}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold mb-2">VS</div>
            <div className="flex gap-4 text-sm mb-1">
              <div className="text-center w-10">
                <div className="font-medium">{match.homeOdds.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">1</div>
              </div>
              <div className="text-center w-10">
                <div className="font-medium">{match.drawOdds.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">X</div>
              </div>
              <div className="text-center w-10">
                <div className="font-medium">{match.awayOdds.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">2</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <img 
              src={awayTeam.logo} 
              alt={awayTeam.name}
              className="h-14 w-14 object-contain mb-2" 
            />
            <span className="text-sm font-medium">{awayTeam.name}</span>
            <span className="text-xs text-muted-foreground mt-1">Form: {awayTeam.form}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Recommendation</span>
            <span className="text-sm font-medium text-bet-accent">{match.recommendedBet}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Confidence</span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full", confidenceClass)}>
              {match.predictionConfidence}%
            </span>
          </div>
        </div>
        
        <Button className="w-full" asChild>
          <Link to={`/matches/${match.id}`} className="flex items-center justify-center gap-1">
            View Analysis
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
