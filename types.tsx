export interface Adventure {
  activity: string;
  date: string;
  notes: string;
  image_url: string;
  stress_level: string;
  hydration: string;
  diet: string;
  sleep: string;
  extraDietNotes: string,
  extraSleepNotes: string,
  adventure_id: number;
}

export interface Error {
  error: boolean | undefined;
  message: string| '';
}