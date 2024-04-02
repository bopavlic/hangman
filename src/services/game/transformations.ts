import { calculateScore } from '@/helpers/calculate-store';
import { Highscore } from './types';

export const transformToHighscores = (highscores: Highscore[]) => {
  return highscores
    .map((highscore) => {
      return {
        ...highscore,
        score: calculateScore(highscore.errors),
      };
    })
    .sort((a, b) => Number(b.score) - Number(a.score));
};
