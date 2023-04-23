import express from 'express';
import mockData from '../mock_data.json';

const app = express();
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log('\x1b[36m%s\x1b[0m', `http://localhost:${port}`);
});

app.get('/api/staff', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const timeout = Math.floor(Math.random() * 400);
  setTimeout(() => {
    res.json(mockData);
  }, timeout)
});
