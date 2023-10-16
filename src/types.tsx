export interface Adventure {
  user_id: number;
  adventure_id: string | undefined;
  activity: string;
  date: string;
  image_url: string;
  stress_level: string;
  hours_slept: number;
  sleep_stress_notes: string;
  hydration: string;
  diet: string;
  diet_hydration_notes: string;
  beta_notes: string;
}

export interface Error {
  error: boolean | undefined;
  message: string| '';
}