const { VITE_API_BASE_URL } = import.meta.env;

if (!VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is required');
}

export const BASE_URL = VITE_API_BASE_URL;
export const DISH_URL = 'dish';
export const PUPILS_URL = 'pupils';
