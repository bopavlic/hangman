import { useMemo } from 'react';

import { Button } from '@/components/ui/button';

type AlphabetLetterProps = {
  letter: string;
  guessedLetters: string[];
  isLoser: boolean;
  isWinner: boolean;
  isLoading: boolean;
  handleLetterClick: (letter: string) => void;
};

export const AlphabetLetter: React.FC<AlphabetLetterProps> = (props) => {
  const {
    letter,
    guessedLetters,
    isLoser,
    isWinner,
    isLoading,
    handleLetterClick,
  } = props;

  const isButtonDisabled = useMemo(() => {
    return guessedLetters.includes(letter) || isLoser || isWinner || isLoading;
  }, [guessedLetters, isLoading, isLoser, isWinner, letter]);

  return (
    <Button
      key={letter}
      variant="outline"
      className="text-white"
      onClick={() => handleLetterClick(letter)}
      disabled={isButtonDisabled}
    >
      {letter.toUpperCase()}
    </Button>
  );
};
