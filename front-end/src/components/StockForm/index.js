import React, { useState } from 'react';
import CustomStockSelector from '../CustomStockSelector';

const stockOptions = [
  { value: 'PETR4', label: 'PETR4 (Petrobras)' },
  { value: 'VALE3', label: 'VALE3 (Vale)' },
  { value: 'ITUB4', label: 'ITUB4 (Itaú Unibanco)' },
  { value: 'BBDC4', label: 'BBDC4 (Bradesco)' },
  { value: 'ABEV3', label: 'ABEV3 (Ambev)' },
  { value: 'MGLU3', label: 'MGLU3 (Magazine Luiza)' },
  { value: 'WEGE3', label: 'WEGE3 (WEG)' },
  { value: 'RENT3', label: 'RENT3 (Localiza)' },
  { value: 'SUZB3', label: 'SUZB3 (Suzano)' },
];

const defaultSelectedValues = ['PETR4', 'VALE3'];

const StockForm = ({ onSubmit }) => {
  const [selectedSymbols, setSelectedSymbols] = useState(defaultSelectedValues);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const symbolsString = selectedSymbols.join(',');

    if (!symbolsString) {
      alert('Por favor, selecione pelo menos um símbolo de ativo.');
      return;
    }
    
    onSubmit(symbolsString, startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      
      <div className="form-group-select">
        <label>Ativos</label>
        <CustomStockSelector
          options={stockOptions}
          value={selectedSymbols}    
          onChange={setSelectedSymbols}
        />
      </div>
      
      <div className="form-group">
        <label>Data de Início</label>
        <input
          type="date"
          max={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Data de Fim</label>
        <input
          type="date"
          max={today}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      
      <button type="submit">Consultar</button>
    </form>
  );
};

export default StockForm;