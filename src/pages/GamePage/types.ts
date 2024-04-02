import { Quote } from '@/services/quote/types';

export type ReducerState = {
  quote: Quote;
  guessedLetters: string[];
  startTime: number;
  endTime: number;
  isLoading: boolean;
};

export enum ActionTypes {
  SET_QUOTE = 'SET_QUOTE',
  SET_GUESSED_LETTERS = 'SET_GUESSED_LETTERS',
  SET_START_TIME = 'SET_START_TIME',
  SET_END_TIME = 'SET_END_TIME',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export type ReduerAction =
  | { type: ActionTypes.SET_QUOTE; payload: Quote }
  | { type: ActionTypes.SET_GUESSED_LETTERS; payload: string[] }
  | { type: ActionTypes.SET_START_TIME; payload: number }
  | { type: ActionTypes.SET_END_TIME; payload: number }
  | { type: ActionTypes.SET_IS_LOADING; payload: boolean };
