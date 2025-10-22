require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.ALPHA_VANTAGE_KEY;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor back-end rodando na porta ${PORT}`);
});

app.get('/api/stocks', async (req, res) => {
    const { symbols, startDate, endDate } = req.query;
  
    if (!symbols) {
      return res.status(400).json({ error: 'Símbolos dos ativos são obrigatórios.' });
    }
  
    const symbolList = symbols.split(',');
    let responseData = [];
  
    try {
      for (const symbol of symbolList) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=full`;
        const apiResponse = await axios.get(url);
  
        const timeSeries = apiResponse.data['Time Series (Daily)'];
  
        if (!timeSeries) {
           console.warn(`Dados não encontrados para ${symbol}`);
           continue; 
        }
  
        const formattedData = Object.keys(timeSeries)
          .map(date => ({
            date: date,
            price: parseFloat(timeSeries[date]['4. close']),
            symbol: symbol,
          }))
          .filter(item => {
            const itemDate = new Date(item.date);
            return (!startDate || itemDate >= new Date(startDate)) &&
                   (!endDate || itemDate <= new Date(endDate));
          });
  
        responseData = [...responseData, ...formattedData];
      }
  
      res.status(200).json(responseData);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar dados na API externa.' });
    }
  });