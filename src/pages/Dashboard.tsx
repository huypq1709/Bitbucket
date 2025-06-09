import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useChartData, usePrediction } from '../hooks/useApi';
import Navbar from '../components/layout/Navbar';
import ControlPanel from '../components/dashboard/ControlPanel';
import MainChart from '../components/dashboard/MainChart';
import SidePanel from '../components/dashboard/SidePanel';
import ChatbotInterface from '../components/dashboard/ChatbotInterface';
import StockOverview from '../components/dashboard/StockOverview';
import TechnicalIndicators from '../components/dashboard/TechnicalIndicators';
import HistoricalDataTable from '../components/dashboard/HistoricalDataTable';
import TradingViewChart from '../components/dashboard/TradingViewChart';
const Dashboard: React.FC = () => {
  const {
    selectedAsset,
    forecastHorizon
  } = useAppContext();
  const {
    chartData,
    loading: loadingChart
  } = useChartData(selectedAsset);
  const {
    predict,
    predicting,
    prediction
  } = usePrediction();
  const [indicators, setIndicators] = useState({
    ma20: false,
    ma50: false,
    ma200: false,
    rsi: false
  });
  const handlePredict = () => {
    predict(selectedAsset, forecastHorizon);
  };
  const handleToggleIndicator = (indicator: string) => {
    setIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator as keyof typeof indicators]
    }));
  };
  // Mock data for StockOverview
  const overviewData = {
    symbol: selectedAsset,
    lastPrice: 190.25,
    change: -2.75,
    changePercent: -1.43,
    open: 193.00,
    dayRange: {
      low: 189.50,
      high: 194.25
    },
    volume: 108500000
  };
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 py-2">
        <div className="max-w-[1600px] mx-auto space-y-4">
          <h1 className="text-xl font-bold text-gray-900">
            Bảng điều khiển phân tích
          </h1>
          <ControlPanel onPredict={handlePredict} predicting={predicting} />
          <StockOverview {...overviewData} />
          <div className="flex gap-4 h-[450px]">
            <div className="flex-1">
              <TechnicalIndicators indicators={indicators} onToggle={handleToggleIndicator} />
              {chartData && chartData.prices && (
                <TradingViewChart
                  data={chartData.prices.map((p: any) => ({
                    time: p[0],
                    open: p[1],
                    high: p[2],
                    low: p[3],
                    close: p[4],
                  }))}
                  height={390}
                />
              )}
            </div>
            <div className="w-[300px]">
              <SidePanel />
            </div>
          </div>
          <div className="w-full h-[400px]">
            <HistoricalDataTable data={chartData?.prices?.map((price: any) => ({
            date: new Date(price[0]).toLocaleDateString(),
            open: price[1],
            high: price[2],
            low: price[3],
            close: price[4],
            adjClose: price[4],
            volume: Math.round(108500000 + Math.random() * 20000000) // Tesla's typical volume range
          }))} />
          </div>
          <ChatbotInterface />
        </div>
      </main>
    </div>;
};
export default Dashboard;