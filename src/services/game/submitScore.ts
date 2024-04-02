import { api } from '../api/api';
import { ScoreData } from './types';

export const submitScore = async (scoreData: ScoreData): Promise<ScoreData> => {
  const response = await api.post('/highscores', scoreData);
  return response.data;
};
