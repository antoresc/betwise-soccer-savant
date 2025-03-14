
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { Match } from "@/services/footballApi";
import { format, parseISO } from "date-fns";

interface UpcomingMatchesCardProps {
  matches: Match[];
}

const UpcomingMatchesCard: React.FC<UpcomingMatchesCardProps> = ({ matches }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Upcoming Matches</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {matches.slice(0, 4).map((match) => (
            <Link
              key={match.id}
              to={`/matches/${match.id}`}
              className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center justify-center text-sm">
                  <span>{format(parseISO(match.date), "dd MMM")}</span>
                  <span className="text-xs text-muted-foreground">{match.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img 
                    src={match.homeTeam.logo} 
                    alt={match.homeTeam.name} 
                    className="h-6 w-6 object-contain" 
                  />
                  <span className="font-medium">{match.homeTeam.shortName}</span>
                  <span className="text-xs px-2">vs</span>
                  <img 
                    src={match.awayTeam.logo} 
                    alt={match.awayTeam.name} 
                    className="h-6 w-6 object-contain" 
                  />
                  <span className="font-medium">{match.awayTeam.shortName}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-right">
                  <div className="text-sm font-medium">{match.competition}</div>
                  <div className="text-xs text-muted-foreground">
                    {match.recommendedBet}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/matches"
            className="text-sm font-medium text-white hover:underline"
          >
            View all matches
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchesCard;
