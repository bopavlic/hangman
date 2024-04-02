import { Quote } from '@/services/quote/types';
import { ReducerState } from './types';

export const NUMBER_OF_ERRORS = 6;

export const initialQuote: Quote = {
  author: '',
  authorSlug: '',
  content: '',
  dateAdded: '',
  dateModified: '',
  length: 0,
  tags: [],
  _id: '',
};

export const initialReducerState: ReducerState = {
  quote: initialQuote,
  guessedLetters: [],
  startTime: 0,
  endTime: 0,
  isLoading: false,
};
