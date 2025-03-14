
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define competition type
export interface Competition {
  id: number;
  name: string;
  country: string;
  logo: string;
}

// Export competitions data so it can be used in multiple components
export const competitions = [
  {
    id: 1,
    name: "Premier League",
    country: "England",
    logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  {
    id: 2,
    name: "La Liga",
    country: "Spain",
    logo: "🇪🇸",
  },
  {
    id: 3,
    name: "Bundesliga",
    country: "Germany",
    logo: "🇩🇪",
  },
  {
    id: 4,
    name: "Serie A",
    country: "Italy",
    logo: "🇮🇹",
  },
  {
    id: 5,
    name: "Ligue 1",
    country: "France",
    logo: "🇫🇷",
  },
];

interface CompetitionContextType {
  activeCompetition: Competition;
  setActiveCompetition: (competition: Competition) => void;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCompetition, setActiveCompetition] = useState<Competition>(competitions[0]);

  return (
    <CompetitionContext.Provider value={{ activeCompetition, setActiveCompetition }}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = (): CompetitionContextType => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error("useCompetition must be used within a CompetitionProvider");
  }
  return context;
};
