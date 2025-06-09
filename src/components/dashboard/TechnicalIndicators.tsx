import React from 'react';
interface TechnicalIndicatorsProps {
  indicators: {
    ma20: boolean;
    ma50: boolean;
    ma200: boolean;
    rsi: boolean;
  };
  onToggle: (indicator: string) => void;
}
const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({
  indicators,
  onToggle
}) => {
  return <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">MA20</span>
          <button onClick={() => onToggle('ma20')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${indicators.ma20 ? 'bg-indigo-600' : 'bg-gray-200'}`}>
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${indicators.ma20 ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">MA50</span>
          <button onClick={() => onToggle('ma50')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${indicators.ma50 ? 'bg-indigo-600' : 'bg-gray-200'}`}>
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${indicators.ma50 ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">MA200</span>
          <button onClick={() => onToggle('ma200')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${indicators.ma200 ? 'bg-indigo-600' : 'bg-gray-200'}`}>
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${indicators.ma200 ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">RSI</span>
          <button onClick={() => onToggle('rsi')} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${indicators.rsi ? 'bg-indigo-600' : 'bg-gray-200'}`}>
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${indicators.rsi ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>
    </div>;
};
export default TechnicalIndicators;