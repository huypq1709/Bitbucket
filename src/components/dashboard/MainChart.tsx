import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
interface MainChartProps {
  chartData: any;
  prediction: any;
  loading: boolean;
}
const MainChart: React.FC<MainChartProps> = ({
  chartData,
  prediction,
  loading
}) => {
  const {
    xaiMode
  } = useAppContext();
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 500
  });
  const margin = {
    top: 20,
    right: 50,
    bottom: 30,
    left: 50
  };
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    data: any;
  } | null>(null);
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const width = svgRef.current.parentElement?.clientWidth || 0;
        setDimensions({
          width,
          height: 500
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const processData = () => {
    if (!chartData?.prices) return null;
    const prices = chartData.prices.slice(-40);
    const xScale = (dimensions.width - margin.left - margin.right) / (prices.length - 1);
    const priceValues = prices.flatMap(p => [p[1], p[2], p[3], p[4]]);
    const minPrice = Math.min(...priceValues);
    const maxPrice = Math.max(...priceValues);
    const yScale = (dimensions.height - margin.top - margin.bottom) / (maxPrice - minPrice);
    return {
      prices: prices.map((price, i) => ({
        x: margin.left + i * xScale,
        open: dimensions.height - margin.bottom - (price[1] - minPrice) * yScale,
        high: dimensions.height - margin.bottom - (price[2] - minPrice) * yScale,
        low: dimensions.height - margin.bottom - (price[3] - minPrice) * yScale,
        close: dimensions.height - margin.bottom - (price[4] - minPrice) * yScale,
        date: new Date(price[0]),
        rawData: price
      })),
      xScale,
      yScale,
      minPrice,
      maxPrice
    };
  };
  const renderCandlesticks = (data: any) => {
    return data.prices.map((point: any, i: number) => {
      const isUp = point.open > point.close;
      const color = isUp ? '#ef4444' : '#10b981';
      const width = Math.max(1, data.xScale * 0.8);
      return <g key={i} onMouseEnter={() => {
        setTooltipData({
          x: point.x,
          y: Math.min(point.open, point.close),
          data: {
            date: point.date,
            open: point.rawData[1],
            high: point.rawData[2],
            low: point.rawData[3],
            close: point.rawData[4]
          }
        });
      }} onMouseLeave={() => setTooltipData(null)}>
          <line x1={point.x} y1={point.high} x2={point.x} y2={point.low} stroke={color} strokeWidth="1" />
          <rect x={point.x - width / 2} y={Math.min(point.open, point.close)} width={width} height={Math.abs(point.close - point.open)} fill={color} />
        </g>;
    });
  };
  if (loading) {
    return <div className="flex justify-center items-center h-[390px] bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse text-gray-500">
          Đang tải dữ liệu biểu đồ...
        </div>
      </div>;
  }
  const processedData = processData();
  if (!processedData) return null;
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative h-[390px]">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="w-full">
        {renderCandlesticks(processedData)}
        {/* Y-axis */}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={dimensions.height - margin.bottom} stroke="#e5e7eb" strokeWidth="1" />
        {/* X-axis */}
        <line x1={margin.left} y1={dimensions.height - margin.bottom} x2={dimensions.width - margin.right} y2={dimensions.height - margin.bottom} stroke="#e5e7eb" strokeWidth="1" />
        {/* Y-axis labels */}
        {Array.from({
        length: 5
      }).map((_, i) => {
        const y = margin.top + (dimensions.height - margin.top - margin.bottom) * (i / 4);
        const value = processedData.maxPrice - (processedData.maxPrice - processedData.minPrice) * (i / 4);
        return <g key={i}>
              <line x1={margin.left} y1={y} x2={dimensions.width - margin.right} y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
              <text x={margin.left - 5} y={y} textAnchor="end" dominantBaseline="middle" className="text-xs fill-gray-500">
                {value.toFixed(2)}
              </text>
            </g>;
      })}
      </svg>
      {/* Tooltip */}
      {tooltipData && <div ref={tooltipRef} className="absolute bg-white p-2 rounded shadow-lg border border-gray-200 text-sm" style={{
      left: tooltipData.x + 10,
      top: tooltipData.y,
      transform: 'translate(-50%, -100%)'
    }}>
          <div className="font-medium">
            {tooltipData.data.date.toLocaleDateString()}
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>Mở: {tooltipData.data.open.toFixed(2)}</div>
            <div>Đóng: {tooltipData.data.close.toFixed(2)}</div>
            <div>Cao: {tooltipData.data.high.toFixed(2)}</div>
            <div>Thấp: {tooltipData.data.low.toFixed(2)}</div>
          </div>
        </div>}
    </div>;
};
export default MainChart;