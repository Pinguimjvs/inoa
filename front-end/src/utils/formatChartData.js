/**
 * Processa os dados da API para o formato que o ApexCharts espera.
 * @param {Array} data - A resposta do seu back-end. Ex: [{date, price, symbol}, ...]
 * @returns {Array} - O formato da prop 'series'. Ex: [{name, data: [{x, y}]}]
 */
const processDataForApexChart = (data) => {
    // 1. Agrupa os dados por símbolo
    const groupedBySymbol = data.reduce((acc, item) => {
      const { symbol, date, price } = item;
  
      if (!acc[symbol]) {
        acc[symbol] = [];
      }
  
      // Adiciona no formato { x: data, y: preco }
      // O ApexCharts entende strings de data ISO (como '2025-10-17')
      acc[symbol].push({
        x: item.date,
        y: item.price
      });
  
      return acc;
    }, {});
  
    // 2. Transforma o objeto no array de 'series'
    const series = Object.keys(groupedBySymbol).map(symbol => {
      // Ordena os dados de cada símbolo por data
      const sortedData = groupedBySymbol[symbol].sort((a, b) => new Date(a.x) - new Date(b.x));
  
      return {
        name: symbol,
        data: sortedData
      };
    });
  
    return series;
  };