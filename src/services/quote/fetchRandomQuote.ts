import axios from 'axios';
import { Quote } from './types';

export const fetchRandomQuote = async (): Promise<Quote> => {
  const response = await axios.get<Quote>('https://api.quotable.io/random');
  return response.data;
};
