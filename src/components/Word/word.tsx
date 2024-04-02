import { Letter } from '@/components';

type WordProps = {
  word: string;
  guessedLetters: string[];
  isLoser: boolean;
};

export const Word: React.FC<WordProps> = (props) => {
  const { word, guessedLetters, isLoser } = props;

  return (
    <div className="mr-2 flex gap-1">
      {word.split('').map((letter, letterIndex) => (
        <Letter
          key={letterIndex}
          letter={letter}
          guessedLetters={guessedLetters}
          isLoser={isLoser}
        />
      ))}
    </div>
  );
};
