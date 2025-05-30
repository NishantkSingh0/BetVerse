import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/matches', async (req, res) => {
  try {
    const apiKey = process.env.CrickData_API;
    const response = await axios.get(`https://cricapi.com/api/matches?apikey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
