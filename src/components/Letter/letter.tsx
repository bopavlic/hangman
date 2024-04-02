import { twMerge } from 'tailwind-merge';

type LetterProps = {
  letter: string;
  guessedLetters: string[];
  isLoser: boolean;
};

export const Letter: React.FC<LetterProps> = (props) => {
  const { letter, guessedLetters, isLoser } = props;

  // This is for a special characters like spaces, commas, etc.
  if (!letter.match(/[a-z]/i)) {
    return <span className="text-white">{letter}</span>;
  }

  return (
    <div className="border-b-2 border-white w-[1rem] flex justify-center items-center h-[1.5rem] gap-5">
      <span
        className={twMerge(
          guessedLetters.includes(letter.toLowerCase()) || isLoser
            ? 'opacity-100'
            : 'opacity-0',
          isLoser ? 'text-red-500 font-bold' : 'text-white',
          'text-lg'
        )}
      >
        {letter}
      </span>
    </div>
  );
};
