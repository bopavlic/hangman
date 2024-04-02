import { calculateScore } from '../helpers/calculate-store';

describe('calculateScore', () => {
  it('should return the correct score', () => {
    expect(calculateScore(0)).toBe('100.00');
    expect(calculateScore(1)).toBe('50.00');
    expect(calculateScore(2)).toBe('33.33');
    expect(calculateScore(3)).toBe('25.00');
    expect(calculateScore(4)).toBe('20.00');
    expect(calculateScore(5)).toBe('16.67');
    expect(calculateScore(6)).toBe('14.29');
  });
});
