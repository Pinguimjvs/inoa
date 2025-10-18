import React, { useState } from 'react';

const StockForm = ({ onSubmit }) => {
  const [symbols, setSymbols] = useState('PETR4,VALE3');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!symbols) {
      alert('Por favor, insira pelo menos um símbolo de ativo.');
      return;
    }
    
    onSubmit(symbols, startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <div>
        <label>
          Ativos (separados por vírgula):
          <input
            type="text"
            value={symbols}
            onChange={(e) => setSymbols(e.target.value)}
            placeholder="Ex: PETR4,VALE3"
            required
          />
        </label>
      </div>
      
      <div>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      
      <button type="submit">Consultar</button>
    </form>
  );
};

export default StockForm;