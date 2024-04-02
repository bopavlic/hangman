import { useCallback, useEffect, useMemo, useReducer } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import { fetchRandomQuote } from '@/services/quote/fetchRandomQuote';
import { NUMBER_OF_ERRORS, initialReducerState } from './const';
import { ActionTypes, ReducerState, ReduerAction } from './types';
import { alphabet } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { submitScore } from '@/services/game/submitScore';
import { useAppSelector } from '@/lib/redux/hook';
import { useToast } from '@/components/ui/use-toast';
import { AlphabetLetter, Word } from '@/components';

function reducer(state: ReducerState, action: ReduerAction): ReducerState {
  switch (action.type) {
    case ActionTypes.SET_QUOTE:
      return { ...state, quote: action.payload };
    case ActionTypes.SET_GUESSED_LETTERS:
      return { ...state, guessedLetters: action.payload };
    case ActionTypes.SET_START_TIME:
      return { ...state, startTime: action.payload };
    case ActionTypes.SET_END_TIME:
      return { ...state, endTime: action.payload };
    case ActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userName = useAppSelector((state) => state.user.userName);
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  const incorrectLetters = useMemo(
    () =>
      state.guessedLetters.filter(
        (letter) => !state.quote.content.includes(letter)
      ),
    [state.guessedLetters, state.quote]
  );

  const uniqueCharactersArray = Array.from(
    new Set(state.quote.content.toLowerCase().replace(/[^a-z]/g, ''))
  );

  const isLoser = useMemo(
    () => incorrectLetters.length >= NUMBER_OF_ERRORS,
    [incorrectLetters]
  );

  const isWinner = useMemo(
    () =>
      uniqueCharactersArray.every((letter) =>
        state.guessedLetters.includes(letter)
      ),
    [uniqueCharactersArray, state.guessedLetters]
  );

  const handleFetchRandomQuote = useCallback(async () => {
    try {
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: true });
      const response = await fetchRandomQuote();
      dispatch({ type: ActionTypes.SET_QUOTE, payload: response });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: ActionTypes.SET_START_TIME, payload: Date.now() });
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: false });
    }
  }, []);

  const handleSubmitScore = async () => {
    const { _id, length } = state.quote;

    const scoreData = {
      quoteId: _id,
      length,
      uniqueCharacters: uniqueCharactersArray.length,
      userName,
      errors: incorrectLetters.length,
      duration: state.endTime - state.startTime,
    };

    try {
      const scoreResponse = await submitScore(scoreData);
      if (scoreResponse) {
        toast({
          className: 'text-white bg-green-900',
          title: 'Score submitted',
          description: 'Your score has been submitted successfully',
        });

        navigate('/game/highscores');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLetterClick = (letter: string) => {
    dispatch({
      type: ActionTypes.SET_GUESSED_LETTERS,
      payload: [...state.guessedLetters, letter],
    });
  };

  const handleResetGame = () => {
    handleFetchRandomQuote();
    dispatch({ type: ActionTypes.SET_GUESSED_LETTERS, payload: [] });
  };

  useEffect(() => {
    if (isWinner) {
      dispatch({ type: ActionTypes.SET_END_TIME, payload: Date.now() });
    }
  }, [isWinner]);

  useEffect(() => {
    handleFetchRandomQuote();
  }, [handleFetchRandomQuote]);

  if (!userName) {
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center h-screen p-2 bg-gradient-to-b from-neutral-900 to-zinc-700">
      <div className="max-w-7xl flex flex-col gap-8">
        {isWinner && !state.isLoading && (
          <p className="text-green-500 text-lg">
            You won! Submit a score to see your name on the leaderboard.
          </p>
        )}

        {isLoser && (
          <p className="text-red-500 text-lg">
            You lost! Don't worry, you can try again.
          </p>
        )}

        <p className="text-white text-lg">
          Number of wrong letters: {incorrectLetters.length}
        </p>

        {!state.isLoading ? (
          <div className="flex flex-wrap gap-4">
            {state.quote.content.split(' ').map((word, index) => (
              <Word
                key={index}
                word={word}
                guessedLetters={state.guessedLetters}
                isLoser={isLoser}
              />
            ))}
          </div>
        ) : (
          <Skeleton count={2} />
        )}

        <div className="flex flex-wrap gap-2">
          {alphabet.map((letter) => (
            <AlphabetLetter
              key={letter}
              letter={letter}
              guessedLetters={state.guessedLetters}
              isLoser={isLoser}
              isWinner={isWinner}
              isLoading={state.isLoading}
              handleLetterClick={handleLetterClick}
            />
          ))}
        </div>

        <div className="flex gap-6">
          <Button
            className="text-white"
            variant="outline"
            onClick={handleResetGame}
            disabled={state.isLoading}
          >
            Reset game
          </Button>
          {isWinner && (
            <Button
              className="bg-white text-black"
              variant="outline"
              onClick={handleSubmitScore}
            >
              Submit score
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
