import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface StockOverviewProps {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  open: number;
  dayRange: {
    low: number;
    high: number;
  };
  volume: number;
}
const StockOverview: React.FC<StockOverviewProps> = ({
  symbol,
  lastPrice,
  change,
  changePercent,
  open,
  dayRange,
  volume
}) => {
  const isPositive = change >= 0;
  return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{symbol}</h2>
          <p className="text-sm text-gray-500">Phân tích thị trường</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Giá hiện tại</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              {lastPrice.toLocaleString()}
            </span>
            <div className={`ml-2 flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUpIcon size={16} /> : <TrendingDownIcon size={16} />}
              <span className="ml-1 text-sm">
                {change.toLocaleString()} ({changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Giá mở cửa</p>
          <p className="text-lg font-semibold text-gray-900">
            {open.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Biên độ ngày</p>
          <p className="text-lg font-semibold text-gray-900">
            {dayRange.low.toLocaleString()} - {dayRange.high.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Khối lượng</p>
          <p className="text-lg font-semibold text-gray-900">
            {volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>;
};
export default StockOverview;