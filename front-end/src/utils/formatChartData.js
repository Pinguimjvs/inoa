export const processDataForApexChart = (data) => {
    const groupedBySymbol = data.reduce((acc, item) => {
      const { symbol, date, price } = item;
      
      if (!acc[symbol]) {
        acc[symbol] = [];
      }
      
      acc[symbol].push({
        x: date,
        y: parseFloat(price).toFixed(2)
      });
      
      return acc;
    }, {});
  
    const series = Object.keys(groupedBySymbol).map(symbol => {
      const sortedData = groupedBySymbol[symbol].sort((a, b) => new Date(a.x) - new Date(b.x));
      
      return {
        name: symbol,
        data: sortedData
      };
    });
  
    return series;
};
  