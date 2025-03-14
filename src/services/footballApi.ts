
// Mock API for football data
// In a real application, you would connect this to a real football API
// like football-data.org, API-Football, or SportMonks

export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  form: string; // Last 5 matches: W, L, D, W, W
  winRate: number;
  goalsScoredAvg: number;
  goalsConcededAvg: number;
  cleanSheets: number;
  strengthIndex: number; // 0-100 rating
  competitionId: number; // Added to associate with competition
}

export interface Player {
  id: number;
  name: string;
  position: string;
  teamId: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  rating: number; // 0-10 rating
  form: string; // "↑", "↓", or "→"
  formReason: string;
  image: string;
  competitionId: number; // Added to associate with competition
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  competition: string;
  competitionId: number; // Added to associate with competition
  date: string;
  time: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  predictionConfidence: number; // 0-100%
  recommendedBet: string;
  keyStats: string[];
  h2h: H2H;
}

export interface H2H {
  homeWins: number;
  draws: number;
  awayWins: number;
  lastMatches: {
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
  }[];
}

export interface BettingTip {
  matchId: number;
  homeTeam: string;
  homeTeamLogo: string;
  awayTeam: string;
  awayTeamLogo: string;
  tip: string;
  confidence: number;
  odds: number;
  reason: string;
  date: string;
  time: string;
  competitionId: number; // Added to associate with competition
}

// Mock data
const mockTeams: Team[] = [
  {
    id: 1,
    name: "Manchester City",
    shortName: "MCI",
    logo: "https://media.api-sports.io/football/teams/50.png",
    form: "WWDWW",
    winRate: 0.75,
    goalsScoredAvg: 2.7,
    goalsConcededAvg: 0.8,
    cleanSheets: 8,
    strengthIndex: 93,
    competitionId: 1 // Premier League
  },
  {
    id: 2,
    name: "Arsenal",
    shortName: "ARS",
    logo: "https://media.api-sports.io/football/teams/42.png",
    form: "WWWDL",
    winRate: 0.70,
    goalsScoredAvg: 2.3,
    goalsConcededAvg: 0.9,
    cleanSheets: 7,
    strengthIndex: 88,
    competitionId: 1 // Premier League
  },
  {
    id: 3,
    name: "Liverpool",
    shortName: "LIV",
    logo: "https://media.api-sports.io/football/teams/40.png",
    form: "WDWWL",
    winRate: 0.68,
    goalsScoredAvg: 2.5,
    goalsConcededAvg: 1.1,
    cleanSheets: 6,
    strengthIndex: 87,
    competitionId: 1 // Premier League
  },
  {
    id: 4,
    name: "Chelsea",
    shortName: "CHE",
    logo: "https://media.api-sports.io/football/teams/49.png",
    form: "LWWDW",
    winRate: 0.62,
    goalsScoredAvg: 2.1,
    goalsConcededAvg: 1.2,
    cleanSheets: 5,
    strengthIndex: 83,
    competitionId: 1 // Premier League
  },
  {
    id: 5,
    name: "Manchester United",
    shortName: "MUN",
    logo: "https://media.api-sports.io/football/teams/33.png", 
    form: "DLWWL",
    winRate: 0.58,
    goalsScoredAvg: 1.8,
    goalsConcededAvg: 1.4,
    cleanSheets: 4,
    strengthIndex: 80,
    competitionId: 1 // Premier League
  },
  {
    id: 6,
    name: "Tottenham",
    shortName: "TOT",
    logo: "https://media.api-sports.io/football/teams/47.png",
    form: "WLLWW",
    winRate: 0.60,
    goalsScoredAvg: 2.0,
    goalsConcededAvg: 1.3,
    cleanSheets: 5,
    strengthIndex: 82,
    competitionId: 1 // Premier League
  },
  // Add teams for other competitions
  {
    id: 7,
    name: "Barcelona",
    shortName: "BAR",
    logo: "https://media.api-sports.io/football/teams/529.png",
    form: "WWWDL",
    winRate: 0.72,
    goalsScoredAvg: 2.5,
    goalsConcededAvg: 0.8,
    cleanSheets: 9,
    strengthIndex: 91,
    competitionId: 2 // La Liga
  },
  {
    id: 8,
    name: "Real Madrid",
    shortName: "RMA",
    logo: "https://media.api-sports.io/football/teams/541.png",
    form: "WDWWW",
    winRate: 0.75,
    goalsScoredAvg: 2.6,
    goalsConcededAvg: 0.7,
    cleanSheets: 10,
    strengthIndex: 92,
    competitionId: 2 // La Liga
  },
  {
    id: 9,
    name: "Bayern Munich",
    shortName: "BAY",
    logo: "https://media.api-sports.io/football/teams/157.png",
    form: "WWWWW",
    winRate: 0.80,
    goalsScoredAvg: 3.0,
    goalsConcededAvg: 0.6,
    cleanSheets: 12,
    strengthIndex: 95,
    competitionId: 3 // Bundesliga
  },
  {
    id: 10,
    name: "Juventus",
    shortName: "JUV",
    logo: "https://media.api-sports.io/football/teams/496.png",
    form: "WDWDL",
    winRate: 0.65,
    goalsScoredAvg: 1.9,
    goalsConcededAvg: 0.8,
    cleanSheets: 8,
    strengthIndex: 85,
    competitionId: 4 // Serie A
  },
  {
    id: 11,
    name: "PSG",
    shortName: "PSG",
    logo: "https://media.api-sports.io/football/teams/85.png",
    form: "WWWWD",
    winRate: 0.78,
    goalsScoredAvg: 2.8,
    goalsConcededAvg: 0.7,
    cleanSheets: 11,
    strengthIndex: 90,
    competitionId: 5 // Ligue 1
  }
];

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Erling Haaland",
    position: "FW",
    teamId: 1,
    goals: 22,
    assists: 5,
    minutesPlayed: 1845,
    rating: 8.7,
    form: "↑",
    formReason: "5 goals in last 3 matches",
    image: "https://media.api-sports.io/football/players/1100.png",
    competitionId: 1 // Premier League
  },
  {
    id: 2,
    name: "Kevin De Bruyne",
    position: "MF",
    teamId: 1,
    goals: 5,
    assists: 14,
    minutesPlayed: 1920,
    rating: 8.4,
    form: "→",
    formReason: "Consistent performances",
    image: "https://media.api-sports.io/football/players/627.png",
    competitionId: 1 // Premier League
  },
  {
    id: 3,
    name: "Bukayo Saka",
    position: "FW",
    teamId: 2,
    goals: 14,
    assists: 11,
    minutesPlayed: 2070,
    rating: 8.1,
    form: "↑",
    formReason: "3 goals, 2 assists in last 4 matches",
    image: "https://media.api-sports.io/football/players/1161.png",
    competitionId: 1 // Premier League
  },
  {
    id: 4,
    name: "Martin Ødegaard",
    position: "MF",
    teamId: 2,
    goals: 8,
    assists: 8,
    minutesPlayed: 2115,
    rating: 8.2,
    form: "→",
    formReason: "Consistent playmaking",
    image: "https://media.api-sports.io/football/players/986.png",
    competitionId: 1 // Premier League
  },
  {
    id: 5,
    name: "Mohamed Salah",
    position: "FW",
    teamId: 3,
    goals: 17,
    assists: 9,
    minutesPlayed: 2025,
    rating: 8.3,
    form: "↓",
    formReason: "No goals in last 2 matches",
    image: "https://media.api-sports.io/football/players/306.png",
    competitionId: 1 // Premier League
  },
  {
    id: 6,
    name: "Cole Palmer",
    position: "MF",
    teamId: 4,
    goals: 16,
    assists: 8,
    minutesPlayed: 1935,
    rating: 7.9,
    form: "↑",
    formReason: "4 goals, 2 assists in last 5 matches",
    image: "https://media.api-sports.io/football/players/19760.png",
    competitionId: 1 // Premier League
  },
  // Add players for other competitions
  {
    id: 7,
    name: "Robert Lewandowski",
    position: "FW",
    teamId: 7,
    goals: 24,
    assists: 6,
    minutesPlayed: 2160,
    rating: 8.6,
    form: "↑",
    formReason: "6 goals in last 4 matches",
    image: "https://media.api-sports.io/football/players/521.png",
    competitionId: 2 // La Liga
  },
  {
    id: 8,
    name: "Vinicius Jr",
    position: "FW",
    teamId: 8,
    goals: 18,
    assists: 12,
    minutesPlayed: 2205,
    rating: 8.5,
    form: "→",
    formReason: "Consistent performances",
    image: "https://media.api-sports.io/football/players/2875.png",
    competitionId: 2 // La Liga
  },
  {
    id: 9,
    name: "Harry Kane",
    position: "FW",
    teamId: 9,
    goals: 25,
    assists: 7,
    minutesPlayed: 2250,
    rating: 8.8,
    form: "↑",
    formReason: "7 goals in last 5 matches",
    image: "https://media.api-sports.io/football/players/184.png",
    competitionId: 3 // Bundesliga
  }
];

// Create mock matches for different competitions
const createMatchesForCompetition = (competitionId: number, competition: string, teams: Team[]): Match[] => {
  const competitionTeams = teams.filter(team => team.competitionId === competitionId);
  
  if (competitionTeams.length < 2) return [];
  
  const matches: Match[] = [];
  
  // Create a few matches using teams from this competition
  for (let i = 0; i < Math.min(3, competitionTeams.length - 1); i++) {
    const homeTeam = competitionTeams[i];
    const awayTeam = competitionTeams[(i + 1) % competitionTeams.length];
    
    matches.push({
      id: 100 + competitionId * 10 + i,
      homeTeam,
      awayTeam,
      competition,
      competitionId,
      date: "2023-11-15",
      time: `${18 + i}:00`,
      homeOdds: 1.85 + (Math.random() * 0.5),
      drawOdds: 3.60 + (Math.random() * 0.5),
      awayOdds: 4.20 + (Math.random() * 0.5),
      predictionConfidence: 60 + Math.floor(Math.random() * 20),
      recommendedBet: ["Home Win", "Away Win", "Draw", "Over 2.5 Goals"][Math.floor(Math.random() * 4)],
      keyStats: [
        `${homeTeam.name} won ${Math.floor(Math.random() * 10)} of their last 10 home matches`,
        `${awayTeam.name} lost ${Math.floor(Math.random() * 5)} of their last 5 away matches`,
        `${homeTeam.name} scored at least 2 goals in ${Math.floor(Math.random() * 10)} of their last 10 matches`
      ],
      h2h: {
        homeWins: Math.floor(Math.random() * 7),
        draws: Math.floor(Math.random() * 3),
        awayWins: Math.floor(Math.random() * 4),
        lastMatches: [
          {
            date: "2023-04-26",
            homeTeam: homeTeam.name,
            awayTeam: awayTeam.name,
            homeScore: Math.floor(Math.random() * 4),
            awayScore: Math.floor(Math.random() * 3)
          },
          {
            date: "2022-12-30",
            homeTeam: awayTeam.name,
            awayTeam: homeTeam.name,
            homeScore: Math.floor(Math.random() * 3),
            awayScore: Math.floor(Math.random() * 3)
          }
        ]
      }
    });
  }
  
  return matches;
};

// Generate mock matches for each competition
const mockMatches: Match[] = [
  ...createMatchesForCompetition(1, "Premier League", mockTeams),
  ...createMatchesForCompetition(2, "La Liga", mockTeams),
  ...createMatchesForCompetition(3, "Bundesliga", mockTeams),
  ...createMatchesForCompetition(4, "Serie A", mockTeams),
  ...createMatchesForCompetition(5, "Ligue 1", mockTeams)
];

// Create betting tips based on matches
const createBettingTipsForMatches = (matches: Match[]): BettingTip[] => {
  return matches.map(match => ({
    matchId: match.id,
    homeTeam: match.homeTeam.name,
    homeTeamLogo: match.homeTeam.logo,
    awayTeam: match.awayTeam.name,
    awayTeamLogo: match.awayTeam.logo,
    tip: match.recommendedBet,
    confidence: match.predictionConfidence,
    odds: match.recommendedBet === "Home Win" ? match.homeOdds : 
          match.recommendedBet === "Away Win" ? match.awayOdds : match.drawOdds,
    reason: `Based on ${match.homeTeam.name}'s form and ${match.awayTeam.name}'s recent performances`,
    date: match.date,
    time: match.time,
    competitionId: match.competitionId
  }));
};

const mockBettingTips: BettingTip[] = createBettingTipsForMatches(mockMatches);

// API methods with competition filtering
export const FootballAPI = {
  getTeams: async (competitionId?: number): Promise<Team[]> => {
    // Simulate API request with optional filtering
    return new Promise((resolve) => {
      setTimeout(() => {
        if (competitionId) {
          resolve(mockTeams.filter(team => team.competitionId === competitionId));
        } else {
          resolve(mockTeams);
        }
      }, 500);
    });
  },
  
  getTeamById: async (id: number): Promise<Team | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTeams.find(team => team.id === id)), 300);
    });
  },
  
  getPlayers: async (competitionId?: number): Promise<Player[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (competitionId) {
          resolve(mockPlayers.filter(player => player.competitionId === competitionId));
        } else {
          resolve(mockPlayers);
        }
      }, 500);
    });
  },
  
  getPlayersByTeam: async (teamId: number): Promise<Player[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredPlayers = mockPlayers.filter(player => player.teamId === teamId);
        resolve(filteredPlayers);
      }, 300);
    });
  },
  
  getUpcomingMatches: async (competitionId?: number): Promise<Match[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (competitionId) {
          resolve(mockMatches.filter(match => match.competitionId === competitionId));
        } else {
          resolve(mockMatches);
        }
      }, 700);
    });
  },
  
  getMatchById: async (id: number): Promise<Match | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMatches.find(match => match.id === id)), 400);
    });
  },
  
  getBettingTips: async (competitionId?: number): Promise<BettingTip[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (competitionId) {
          resolve(mockBettingTips.filter(tip => tip.competitionId === competitionId));
        } else {
          resolve(mockBettingTips);
        }
      }, 600);
    });
  }
};
