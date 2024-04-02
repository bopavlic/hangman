import { useEffect, useState } from 'react';

import { fetchHighscores } from '@/services/game/fetchHighscores';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MainTitle } from '@/components/ui/main-title';
import { Highscore } from '@/services/game/types';

export const HighscoresPage = () => {
  const [highscores, setHighscores] = useState<Highscore[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchHighscores();
        setHighscores(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center p-2 bg-gradient-to-b from-neutral-900 to-zinc-700 min-h-screen">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
        <MainTitle className="text-center">Highscores</MainTitle>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white bg-zinc-800 text-center w-1/2">
                  Name
                </TableHead>
                <TableHead className="text-white bg-zinc-800 text-center w-1/2">
                  Score
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highscores?.length > 0 &&
                highscores.map(({ id, userName, score }) => (
                  <TableRow key={id}>
                    <TableCell className="text-white text-center w-1/2">
                      {userName}
                    </TableCell>
                    <TableCell className="text-white text-center w-1/2">
                      {score}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
