jest.mock('../models/db', () => ({
  poolConnect: Promise.resolve(),
  pool: {
    request: () => ({
      input: () => ({
        query: jest.fn().mockResolvedValue({
          recordset: [
            { id: 1, title: 'Inception', director: 'Nolan', year: 2010 },
          ],
        }),
      }),
    }),
  },
  sql: {}
}));

const { getAll } = require('../controllers/movieController');

describe('Movie Controller', () => {
  const req = { user: { userId: 1 } };
  const res = {
    json: jest.fn(),
  };

  test('getAll should return movie list', async () => {
    await getAll(req, res);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, title: 'Inception', director: 'Nolan', year: 2010 },
    ]);
  });
});
