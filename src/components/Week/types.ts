import { JSX } from 'react';
import { IUser } from '../../models/types.ts';

export type SetUserState = (users: IUser[]) => void;
export type WeekCell = string | number | JSX.Element;
export type WeekRow = WeekCell[];
