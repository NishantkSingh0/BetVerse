import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

const Plot = ({ viewRate }) => {
  const [chartLabels, setLabels] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [incrementData, setIncrementData] = useState([]);

  useEffect(() => {
    if (!viewRate || viewRate.length < 2) return;

    const time = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const initViews = viewRate.map(val => val);
    const initIncrements = viewRate.slice(1).map((val, idx) => val - viewRate[idx]);
    const initLabels = viewRate.map(() => time());

    setLabels(initLabels);
    setViewData(initViews);
    setIncrementData([0, ...initIncrements]);
  }, []);

  useEffect(() => {
    if (viewRate.length > viewData.length) {
      const newVal = viewRate[viewRate.length - 1];
      const prevVal = viewRate[viewRate.length - 2];
      const newInc = newVal - prevVal;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setLabels(prev => [...prev, time]);
      setViewData(prev => [...prev, newVal]);
      setIncrementData(prev => [...prev, newInc]);
    }
  }, [viewRate]);

  const viewMin = viewData[0] || 0;
  const viewMax = viewData[viewData.length - 1] || 0;
  const incMin = 0;
  const incMax = incrementData[incrementData.length - 1] || 0;

  const data = {
    labels: chartLabels,
    datasets: [
      {
        type: 'line',
        label: 'Total Views',
        data: viewData,
        borderColor: '#FF4D4F',
        backgroundColor: 'rgba(255,77,79,0.1)',
        tension: 0.4,
        yAxisID: 'y',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        type: 'bar',
        label: 'View Increment',
        data: incrementData,
        backgroundColor: '#4ADE80',
        yAxisID: 'y1',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw;
            return context.dataset.label === 'Total Views'
              ? `${(val / 1000).toFixed(2)}K views`
              : `+ ${(val / 1000).toFixed(2)}K increment`;
          }
        }
      },
      legend: { labels: { color: '#333' } }
    },
    scales: {
      x: {
        ticks: { color: '#666' },
        grid: { display: false },
      },
      y: {
        type: 'linear',
        position: 'left',
        ticks: {
          callback: val => `${(val / 1000).toFixed(2)}K`,
          color: '#FF4D4F',
        },
        min: viewMin,
        max: viewMax,
      },
      y1: {
        type: 'linear',
        position: 'right',
        ticks: {
          callback: val => `${(val / 1000).toFixed(1)}K`,
          color: '#4ADE80',
        },
        grid: { drawOnChartArea: false },
        min: incMin,
        max: incMax,
      }
    }
  };

  return <Chart type='bar' data={data} options={options} />;
};

export default Plot;
