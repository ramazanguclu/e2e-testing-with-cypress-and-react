/* eslint-disable @typescript-eslint/no-var-requires */
// mock api

const express = require('express');
const cors = require('cors');

const cities = [
  {
    id: 1,
    label: 'istanbul',
  },
  {
    id: 2,
    label: 'ankara',
  },
];

const districts = {
  1: [
    { id: 1, label: 'ümraniye' },
    { id: 2, label: 'üsküdar' },
    { id: 3, label: 'kadıköy' },
  ],
  2: [
    { id: 4, label: 'etimesgut' },
    { id: 5, label: 'keçiören' },
    { id: 6, label: 'kızılay' },
  ],
};

const app = express();
app.use(cors());

app.get('/cities', (req, res) => {
  return res.send({
    status: true,
    data: cities,
  });
});

app.get('/districts', (req, res) => {
  const { cityId } = req.query;

  const list = districts[cityId];
  return res.send({
    status: false,
    data: list || [],
  });
});

app.post('/validate', (req, res) => {
  return res.send({
    status: true,
    data: { transactionId: '12345678' },
  });
});

app.listen(5000, () => {
  console.log('listening 5000 port');
});
