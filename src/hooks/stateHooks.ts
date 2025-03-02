import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/weekStore.ts';

export const useWeekDispatch = useDispatch.withTypes<AppDispatch>();
export const useWeekSelector = useSelector.withTypes<RootState>();
