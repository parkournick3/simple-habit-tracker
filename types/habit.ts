import { Dayjs } from "dayjs";

export interface Habit {
  name: string;
  streak: number;
  lastCompleted: Dayjs | null;
}

