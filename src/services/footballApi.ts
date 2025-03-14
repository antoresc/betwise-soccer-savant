
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
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  competition: string;
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
    strengthIndex: 93
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
    strengthIndex: 88
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
    strengthIndex: 87
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
    strengthIndex: 83
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
    strengthIndex: 80
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
    strengthIndex: 82
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
    image: "https://media.api-sports.io/football/players/1100.png"
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
    image: "https://media.api-sports.io/football/players/627.png"
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
    image: "https://media.api-sports.io/football/players/1161.png"
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
    image: "https://media.api-sports.io/football/players/986.png"
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
    image: "https://media.api-sports.io/football/players/306.png"
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
    image: "https://media.api-sports.io/football/players/19760.png"
  }
];

const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: mockTeams[0], // Man City
    awayTeam: mockTeams[1], // Arsenal
    competition: "Premier League",
    date: "2023-11-15",
    time: "20:00",
    homeOdds: 1.85,
    drawOdds: 3.75,
    awayOdds: 4.20,
    predictionConfidence: 70,
    recommendedBet: "Home Win",
    keyStats: [
      "Manchester City won 7 of their last 10 home matches",
      "Arsenal lost 3 of their last 5 away matches against top-4 teams",
      "Manchester City scored at least 2 goals in 8 of their last 10 home matches"
    ],
    h2h: {
      homeWins: 6,
      draws: 2,
      awayWins: 2,
      lastMatches: [
        {
          date: "2023-04-26",
          homeTeam: "Manchester City",
          awayTeam: "Arsenal",
          homeScore: 4,
          awayScore: 1
        },
        {
          date: "2022-12-30",
          homeTeam: "Arsenal",
          awayTeam: "Manchester City",
          homeScore: 1,
          awayScore: 3
        },
        {
          date: "2022-01-01",
          homeTeam: "Arsenal",
          awayTeam: "Manchester City",
          homeScore: 1,
          awayScore: 2
        }
      ]
    }
  },
  {
    id: 2,
    homeTeam: mockTeams[2], // Liverpool
    awayTeam: mockTeams[3], // Chelsea
    competition: "Premier League",
    date: "2023-11-16",
    time: "17:30",
    homeOdds: 1.70,
    drawOdds: 3.90,
    awayOdds: 4.50,
    predictionConfidence: 65,
    recommendedBet: "Over 2.5 Goals",
    keyStats: [
      "Liverpool scored in their last 12 home matches",
      "Chelsea's last 7 away matches had over 2.5 goals",
      "Both teams scored in 8 of their last 10 meetings"
    ],
    h2h: {
      homeWins: 5,
      draws: 3,
      awayWins: 2,
      lastMatches: [
        {
          date: "2023-01-21",
          homeTeam: "Liverpool",
          awayTeam: "Chelsea",
          homeScore: 0,
          awayScore: 0
        },
        {
          date: "2022-08-28",
          homeTeam: "Chelsea",
          awayTeam: "Liverpool",
          homeScore: 2,
          awayScore: 1
        },
        {
          date: "2022-02-27",
          homeTeam: "Chelsea",
          awayTeam: "Liverpool",
          homeScore: 0,
          awayScore: 0
        }
      ]
    }
  },
  {
    id: 3,
    homeTeam: mockTeams[4], // Man United
    awayTeam: mockTeams[5], // Tottenham
    competition: "Premier League",
    date: "2023-11-17",
    time: "16:00",
    homeOdds: 2.05,
    drawOdds: 3.60,
    awayOdds: 3.40,
    predictionConfidence: 55,
    recommendedBet: "Both Teams to Score",
    keyStats: [
      "Man United have kept only 2 clean sheets in their last 10 matches",
      "Tottenham scored in 9 of their last 10 away matches",
      "5 of the last 7 meetings saw both teams score"
    ],
    h2h: {
      homeWins: 4,
      draws: 2,
      awayWins: 4,
      lastMatches: [
        {
          date: "2023-04-27",
          homeTeam: "Tottenham",
          awayTeam: "Manchester United",
          homeScore: 2,
          awayScore: 2
        },
        {
          date: "2022-10-19",
          homeTeam: "Manchester United",
          awayTeam: "Tottenham",
          homeScore: 2,
          awayScore: 0
        },
        {
          date: "2022-03-12",
          homeTeam: "Manchester United",
          awayTeam: "Tottenham",
          homeScore: 3,
          awayScore: 2
        }
      ]
    }
  },
  {
    id: 4,
    homeTeam: mockTeams[1], // Arsenal
    awayTeam: mockTeams[4], // Man United
    competition: "Premier League",
    date: "2023-11-20",
    time: "20:00",
    homeOdds: 1.75,
    drawOdds: 3.80,
    awayOdds: 4.50,
    predictionConfidence: 68,
    recommendedBet: "Home Win & Over 2.5 Goals",
    keyStats: [
      "Arsenal won 8 of their last 10 home matches",
      "Man United conceded at least 2 goals in 6 of their last 10 away matches",
      "Arsenal scored in the first half in 7 of their last 10 home matches"
    ],
    h2h: {
      homeWins: 5,
      draws: 2,
      awayWins: 3,
      lastMatches: [
        {
          date: "2023-09-03",
          homeTeam: "Arsenal",
          awayTeam: "Manchester United",
          homeScore: 3,
          awayScore: 1
        },
        {
          date: "2023-01-22",
          homeTeam: "Arsenal",
          awayTeam: "Manchester United",
          homeScore: 3,
          awayScore: 2
        },
        {
          date: "2022-09-04",
          homeTeam: "Manchester United",
          awayTeam: "Arsenal",
          homeScore: 3,
          awayScore: 1
        }
      ]
    }
  }
];

const mockBettingTips: BettingTip[] = [
  {
    matchId: 1,
    homeTeam: "Manchester City",
    homeTeamLogo: "https://media.api-sports.io/football/teams/50.png",
    awayTeam: "Arsenal",
    awayTeamLogo: "https://media.api-sports.io/football/teams/42.png",
    tip: "Home Win",
    confidence: 75,
    odds: 1.85,
    reason: "Man City's strong home form and historical dominance in this fixture",
    date: "2023-11-15",
    time: "20:00"
  },
  {
    matchId: 2,
    homeTeam: "Liverpool",
    homeTeamLogo: "https://media.api-sports.io/football/teams/40.png",
    awayTeam: "Chelsea",
    awayTeamLogo: "https://media.api-sports.io/football/teams/49.png",
    tip: "Over 2.5 Goals",
    confidence: 70,
    odds: 1.75,
    reason: "Both teams have strong attacking records and recent meetings have been high-scoring",
    date: "2023-11-16",
    time: "17:30"
  },
  {
    matchId: 3,
    homeTeam: "Manchester United",
    homeTeamLogo: "https://media.api-sports.io/football/teams/33.png",
    awayTeam: "Tottenham",
    awayTeamLogo: "https://media.api-sports.io/football/teams/47.png",
    tip: "Both Teams to Score",
    confidence: 80,
    odds: 1.65,
    reason: "Both teams have been scoring consistently but also conceding regularly",
    date: "2023-11-17",
    time: "16:00"
  },
  {
    matchId: 4,
    homeTeam: "Arsenal",
    homeTeamLogo: "https://media.api-sports.io/football/teams/42.png",
    awayTeam: "Manchester United",
    awayTeamLogo: "https://media.api-sports.io/football/teams/33.png",
    tip: "Home Win & Over 2.5 Goals",
    confidence: 65,
    odds: 2.20,
    reason: "Arsenal's strong home form and Man United's defensive vulnerabilities",
    date: "2023-11-20",
    time: "20:00"
  }
];

// API methods
export const FootballAPI = {
  getTeams: async (): Promise<Team[]> => {
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTeams), 500);
    });
  },
  
  getTeamById: async (id: number): Promise<Team | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTeams.find(team => team.id === id)), 300);
    });
  },
  
  getPlayers: async (): Promise<Player[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlayers), 500);
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
  
  getUpcomingMatches: async (): Promise<Match[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMatches), 700);
    });
  },
  
  getMatchById: async (id: number): Promise<Match | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMatches.find(match => match.id === id)), 400);
    });
  },
  
  getBettingTips: async (): Promise<BettingTip[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBettingTips), 600);
    });
  }
};
