import * as dotenv from 'dotenv';
import express from 'express';
import mockData5k from '../mock_data_5000.json' assert { type: 'json' };
import mockData50k from '../mock_data_50000.json' assert { type: 'json' };
dotenv.config();

const app = express();
const port = process.env.PORT;
const mock_data_size = process.env.MOCK_DATA_SIZE;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log('\x1b[36m%s\x1b[0m', `http://localhost:${port}`);
});

app.get('/api/staff', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const timeout = Math.floor(Math.random() * 400);
  setTimeout(() => {
    res.json(mock_data_size === '5k' ? mockData5k: mockData50k);
  }, timeout)
});
