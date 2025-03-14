import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, ChevronRight } from "lucide-react";
import { BettingTip } from "@/services/footballApi";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
interface BettingTipsCardProps {
  tips: BettingTip[];
}
const BettingTipsCard: React.FC<BettingTipsCardProps> = ({
  tips
}) => {
  return <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Top Betting Tips</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.slice(0, 3).map(tip => <div key={tip.matchId} className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center justify-center text-sm">
                    <span>{format(parseISO(tip.date), "dd MMM")}</span>
                    <span className="text-xs text-muted-foreground">{tip.time}</span>
                  </div>
                  <div className="ml-2">
                    <div className="flex items-center gap-2">
                      <img src={tip.homeTeamLogo} alt={tip.homeTeam} className="h-5 w-5" />
                      <span className="text-sm font-medium">{tip.homeTeam}</span>
                      <span className="text-xs px-1">vs</span>
                      <img src={tip.awayTeamLogo} alt={tip.awayTeam} className="h-5 w-5" />
                      <span className="text-sm font-medium">{tip.awayTeam}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Tip: <span className="text-bet-accent">{tip.tip}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-bet-muted rounded-full">
                      Odds: {tip.odds.toFixed(2)}
                    </span>
                    <div className={cn("text-xs px-2 py-0.5 rounded-full", tip.confidence >= 70 ? "bg-bet-success/20 text-bet-success" : tip.confidence >= 50 ? "bg-bet-warning/20 text-bet-warning" : "bg-bet-danger/20 text-bet-danger")}>
                      {tip.confidence}% confidence
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/matches/${tip.matchId}`}>
                    Details
                  </Link>
                </Button>
              </div>
            </div>)}
        </div>
        <div className="mt-4 text-center">
          <Link to="/tips" className="text-sm font-medium text-white hover:underline">
            View all betting tips
          </Link>
        </div>
      </CardContent>
    </Card>;
};
export default BettingTipsCard;