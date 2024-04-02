export const calculateScore = (numberOfErrors: number) => {
  const score = 100 / (1 + numberOfErrors);
  return score.toFixed(2);
};
