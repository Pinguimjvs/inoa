import React from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({ seriesData }) => {
  const options = {
    chart: {
      type: 'line',
      height: 400,
      zoom: { 
        enabled: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    xaxis: {
      type: 'datetime', 
      title: {
        text: 'Data'
      }
    },
    yaxis: {
      title: {
        text: 'Preço (R$)'
      },
      labels: {
        formatter: (value) => { return value ? value.toFixed(2) : ''; }
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy'
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    title: {
      text: 'Preço de Fechamento dos Ativos',
      align: 'left'
    },
    // O 'series' virá do estado
  };

  return (
    <div className="stock-chart">
      <Chart
        options={options}
        series={seriesData}
        type="line"
        height={400}
      />
    </div>
  );
};

export default StockChart;