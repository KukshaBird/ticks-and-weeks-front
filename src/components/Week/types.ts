import React, { JSX } from 'react';
import User from '../../models/User.ts';

export type SetUserState = React.Dispatch<React.SetStateAction<User[]>>;
export type WeekCell = string | number | JSX.Element;
export type WeekRow = WeekCell[];
