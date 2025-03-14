import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Player } from "@/services/footballApi";
import { cn } from "@/lib/utils";
interface TopPlayersCardProps {
  players: Player[];
}
const TopPlayersCard: React.FC<TopPlayersCardProps> = ({
  players
}) => {
  return <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Top Players</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {players.slice(0, 4).map(player => <div key={player.id} className="flex items-center gap-4">
              <img src={player.image} alt={player.name} className="h-12 w-12 rounded-full object-cover border" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{player.name}</span>
                  <span className={cn("text-xs px-1.5 py-0.5 rounded", player.form === "↑" ? "bg-bet-success/20 text-bet-success" : player.form === "↓" ? "bg-bet-danger/20 text-bet-danger" : "bg-bet-muted text-muted-foreground")}>
                    {player.form}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{player.position}</span>
                  <span>•</span>
                  <span>{player.formReason}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{player.rating.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>)}
        </div>
        <div className="mt-4 text-center">
          <Link to="/statistics" className="text-sm font-medium text-white hover:underline">
            View all players
          </Link>
        </div>
      </CardContent>
    </Card>;
};
export default TopPlayersCard;