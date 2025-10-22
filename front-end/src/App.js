import React, { useState } from 'react';
import StockForm from './components/StockForm';
import StockChart from './components/StackChart';
import { getStockData } from './services/getServices';
import { processDataForApexChart } from './utils/formatChartData';
import './App.css'; 



function App() {
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (symbols, startDate, endDate) => {
    setIsLoading(true);
    setError(null);
    setSeriesData([]); 

    try {
      const formattedSymbols = symbols
        .split(',')
        .map(s => `${s.trim().toUpperCase()}.SA`)
        .join(',');
        
      const data = await getStockData(formattedSymbols, startDate, endDate);

      if (!data || data.length === 0) {
        setError('Nenhum dado encontrado para os ativos ou datas informadas.');
        return; 
      }

      const processedData = processDataForApexChart(data);
      setSeriesData(processedData);

    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(`Falha ao buscar dados: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Consulta de Ativos da B3</h1>
      </header>
      <main>
        <StockForm onSubmit={fetchData} />
        
        <div className="chart-container">          
          {isLoading && <p>Buscando dados...</p>}
          
          {error && <p className="error-message">{error}</p>}
          
          {!isLoading && !error && seriesData.length > 0 && (
            <StockChart seriesData={seriesData} />
          )}
          
          {!isLoading && !error && seriesData.length === 0 && (
            <p>Por favor, insira os ativos e datas para consultar.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;