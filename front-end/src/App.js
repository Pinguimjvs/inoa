import React, { useState } from 'react';
import axios from 'axios';
import StockForm from './components/StockForm';
import StockChart from './components/StockChart';
import './App.css';

const API_URL = 'http://localhost:3001/api/stocks';

function App() {
  // Estado para os dados do gráfico (no formato do ApexCharts)
  const [seriesData, setSeriesData] = useState([]);
  // Estado para feedback ao usuário
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Função principal que busca os dados no back-end.
   * Será passada como prop para o StockForm.
   */
  const fetchData = async (symbols, startDate, endDate) => {
    setIsLoading(true);
    setError(null);
    setSeriesData([]); // Limpa dados anteriores

    try {
      // 1. Formatar os símbolos para o padrão da API (ex: PETR4.SA)
      const formattedSymbols = symbols
        .split(',') // Divide por vírgula
        .map(s => `${s.trim().toUpperCase()}.SA`) // Formata cada um
        .join(','); // Junta novamente

      // 2. Fazer a chamada ao nosso back-end
      const response = await axios.get(API_URL, {
        params: {
          symbols: formattedSymbols,
          startDate,
          endDate
        }
      });

      // 3. Verificar se a API retornou dados
      if (!response.data || response.data.length === 0) {
        setError('Nenhum dado encontrado para os ativos ou datas informadas.');
        return;
      }

      // 4. Processar os dados para o formato do gráfico
      const processedData = processDataForApexChart(response.data);
      setSeriesData(processedData);

    } catch (err) {
      console.error("Erro ao buscar dados do back-end:", err);
      let errorMsg = 'Falha ao buscar dados. ';
      
      // Tenta pegar uma mensagem de erro mais específica do back-end
      if (err.response && err.response.data && err.response.data.error) {
        errorMsg += err.response.data.error;
      } else {
        errorMsg += 'Verifique se o back-end está rodando.';
      }
      setError(errorMsg);
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
        {/* O formulário recebe a função de fetch como prop */}
        <StockForm onSubmit={fetchData} />
        
        <div className="chart-container">
          {/* Renderização condicional */}
          
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