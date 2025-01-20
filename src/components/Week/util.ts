import { WeekDay } from './types.ts';

interface Day {
  day: string;
  lunch: boolean;
  breakfast: boolean;
  benefit: boolean;
  active: boolean;
}

export const getWeekDay = (dayName: WeekDay, days: Day[]): Day | null => {
  const dayIndex = days.findIndex((day) => day.day === dayName);
  return dayIndex === -1 ? null : days[dayIndex];
};
