export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface WeekData {
  balance: {
    was: number;
    now: number;
    added: number;
    removed: number;
  };
  id: string;
  name: string;
  benefit: boolean;
  active: boolean;
  payments: {
    day: WeekDay;
    lunch: boolean;
    breakfast: boolean;
  }[];
}
