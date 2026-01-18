export interface FftbgResponse {
  data: string;
}

export interface FftbgClient {
  classInfo(): Promise<FftbgResponse>;
  itemInfo(): Promise<FftbgResponse>;
  abilityInfo(): Promise<FftbgResponse>;
  statusInfo(): Promise<FftbgResponse>;
  zodiacInfo(): Promise<FftbgResponse>;
  monsters(): Promise<FftbgResponse>;
  monsterSkills(): Promise<FftbgResponse>;
  tournamentTeam(tournamentId: string, teamName: string): Promise<FftbgResponse>;
  tournamentMaps(tournamentId: string): Promise<FftbgResponse>;
  tournamentWinners(tournamentId: string): Promise<FftbgResponse>;
  tournamentList(): Promise<FftbgResponse>;
}
