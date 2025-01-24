import User from '../../models/User.ts';

type Day = {
  day: string;
  lunch: boolean;
  breakfast: boolean;
};

export const fillTotals = (totals: number[], filledDays: Day[], data: User[]): void => {
  for (let i = 0; i < filledDays.length; i++) {
    const totalIndex = i + 2;
    totals[totalIndex] = data.reduce((acc, user) => {
      let addSum = 0;
      const paymentData = user.payments.find((payment) => payment.day === filledDays[i].day);
      if (paymentData) {
        if (paymentData.breakfast) {
          addSum += 75;
        }
        if (paymentData.lunch) {
          addSum += 95;
        }
      }
      return acc + addSum;
    }, 0);
  }
};
