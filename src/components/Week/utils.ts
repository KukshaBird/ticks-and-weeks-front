import { IUser } from '../../models/types.ts';

type Day = {
  day: string;
  lunch: boolean;
  breakfast: boolean;
};

type Price = { name: string; price: number };

const findPriceOrThrow = (name: string, prices: Price[]): number => {
  const price = prices.find((price) => price.name === name);
  if (!price) {
    throw new Error(`Required price not found. Please create "${name}" dish`);
  }
  return price.price;
};

export const fillTotals = (totals: number[], filledDays: Day[], users: IUser[], prices: Price[]): void => {
  const breakfastPrice = findPriceOrThrow('breakfast', prices);
  const lunchPrice = findPriceOrThrow('lunch', prices);

  for (let i = 0; i < filledDays.length; i++) {
    const totalIndex = i + 2;
    totals[totalIndex] = users.reduce((acc, user) => {
      let addSum = 0;
      const paymentData = user.payments.find((payment) => payment.day === filledDays[i].day);
      if (paymentData) {
        if (paymentData.breakfast) {
          addSum += user.benefit ? 0 : breakfastPrice;
        }
        if (paymentData.lunch) {
          addSum += lunchPrice;
        }
      }
      return acc + addSum;
    }, 0);
  }
};

export const userBalanceSpent = (user: IUser, prices: { name: string; price: number }[]): number => {
  const lunchPrice = prices.find((price) => price.name === 'lunch');
  const breakfastPrice = prices.find((price) => price.name === 'breakfast');

  return user.payments.reduce((acc, payment) => {
    // benefit related only for morning breakfast
    const breakfastRent = !user.benefit && payment.breakfast && breakfastPrice ? breakfastPrice.price : 0;
    const lunchRent = payment.lunch && lunchPrice ? lunchPrice.price : 0;
    return acc + lunchRent + breakfastRent;
  }, 0);
};

export const userBalanceLeft = (user: IUser, prices: Price[]): number => {
  return user.balance.was + user.balance.added - userBalanceSpent(user, prices);
};
