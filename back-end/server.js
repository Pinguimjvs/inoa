// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json());

// Guarde sua API Key em um arquivo .env!
// Ex: require('dotenv').config();
// const API_KEY = process.env.ALPHA_VANTAGE_KEY;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor back-end rodando na porta ${PORT}`);
});

// Continuação do server.js

app.get('/api/stocks', async (req, res) => {
    const { symbols, startDate, endDate } = req.query; // Ex: 'PETR4.SA,VALE3.SA'
  
    if (!symbols) {
      return res.status(400).json({ error: 'Símbolos dos ativos são obrigatórios.' });
    }
  
    const symbolList = symbols.split(',');
    let responseData = [];
  
    try {
      for (const symbol of symbolList) {
        // 1. Chamar a API Externa (Alpha Vantage)
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=full`;
        const apiResponse = await axios.get(url);
  
        // 2. Tratar os Dados (MUITO IMPORTANTE)
        const timeSeries = apiResponse.data['Time Series (Daily)'];
  
        if (!timeSeries) {
           // Pode pular este símbolo ou retornar erro
           console.warn(`Dados não encontrados para ${symbol}`);
           continue; 
        }
  
        // 3. Filtrar e Formatar
        // O objeto da AV vem com datas como chaves.
        const formattedData = Object.keys(timeSeries)
          .map(date => ({
            date: date,
            // A API da AV retorna "4. close"
            price: parseFloat(timeSeries[date]['4. close']),
            symbol: symbol,
          }))
          .filter(item => {
            // Filtra pelo range de datas, se fornecido
            const itemDate = new Date(item.date);
            return (!startDate || itemDate >= new Date(startDate)) &&
                   (!endDate || itemDate <= new Date(endDate));
          });
  
        responseData = [...responseData, ...formattedData];
      }
  
      // 4. Enviar os dados limpos para o Front-end
      res.status(200).json(responseData);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar dados na API externa.' });
    }
  });