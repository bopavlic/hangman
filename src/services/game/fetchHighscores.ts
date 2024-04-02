import { api } from '../api/api';
import { transformToHighscores } from './transformations';
import { Highscore } from './types';

export const fetchHighscores = async (): Promise<Highscore[]> => {
  const response = await api.get<Highscore[]>('/highscores');
  return transformToHighscores(response.data);
};
