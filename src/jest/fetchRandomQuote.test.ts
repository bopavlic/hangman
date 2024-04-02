import axios from 'axios';

import { fetchRandomQuote } from '../services/quote/fetchRandomQuote';

jest.mock('axios');

describe('fetchRandomQuote', () => {
  it('should fetch a random quote from the API', async () => {
    const mockQuote = {
      _id: 'hLCOLhZE_92V',
      content: 'Reality is merely an illusion, albeit a very persistent one.',
      author: 'Albert Einstein',
      tags: ['Famous Quotes', 'Science', 'Wisdom'],
      authorSlug: 'albert-einstein',
      length: 60,
      dateAdded: '2019-09-08',
      dateModified: '2023-04-14',
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockQuote });

    const quote = await fetchRandomQuote();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.quotable.io/random');

    expect(quote).toEqual(mockQuote);
  });
});
