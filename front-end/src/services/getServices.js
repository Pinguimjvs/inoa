import axios from 'axios';

const API_URL = 'http://localhost:3001/api/stocks';

export const getStockData = async (symbols, startDate, endDate) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        symbols,
        startDate,
        endDate
      }
    });
    
    return response.data;

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error('Não foi possível conectar ao servidor da API.');
  }
};