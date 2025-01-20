import { WeekData } from './types.ts';

const dumpData: WeekData[] = [
  {
    id: 'id-1',
    name: 'Name One',
    benefit: false,
    active: true,
    balance: {
      was: 100,
      now: 200,
      added: 100,
      removed: 200,
    },
    payments: [
      {
        day: 'Friday',
        lunch: true,
        breakfast: true,
      },
      {
        day: 'Tuesday',
        lunch: true,
        breakfast: true,
      },
      {
        day: 'Wednesday',
        lunch: true,
        breakfast: true,
      },
    ],
  },
  {
    id: 'id-2',
    name: 'Name One',
    benefit: false,
    active: true,
    balance: {
      was: 100,
      now: 200,
      added: 100,
      removed: 200,
    },
    payments: [
      {
        day: 'Friday',
        lunch: true,
        breakfast: true,
      },
      {
        day: 'Tuesday',
        lunch: true,
        breakfast: true,
      },
      {
        day: 'Wednesday',
        lunch: true,
        breakfast: true,
      },
    ],
  },
  {
    id: 'id-3',
    name: 'Name One',
    benefit: false,
    active: true,
    balance: {
      was: 100,
      now: 200,
      added: 100,
      removed: 200,
    },
    payments: [
      {
        day: 'Friday',
        lunch: true,
        breakfast: true,
      },
      {
        day: 'Tuesday',
        lunch: true,
        breakfast: true,
      },
      {
        day: 'Wednesday',
        lunch: true,
        breakfast: true,
      },
    ],
  },
];

export default dumpData;
