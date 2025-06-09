import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useAssets } from '../../hooks/useApi';
import { ChevronDownIcon, BarChart2Icon, LoaderIcon } from 'lucide-react';
interface ControlPanelProps {
  onPredict: () => void;
  predicting: boolean;
}
const ControlPanel: React.FC<ControlPanelProps> = ({
  onPredict,
  predicting
}) => {
  const {
    selectedAsset,
    setSelectedAsset,
    forecastHorizon,
    setForecastHorizon,
    xaiMode,
    setXaiMode
  } = useAppContext();
  const {
    assets,
    loading
  } = useAssets();
  const horizonOptions = ['5 phút', '1 giờ', '1 ngày'];
  const xaiOptions = ['DAVOTS', 'ICFTS', 'Tắt'];
  return <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <label htmlFor="asset-selector" className="block text-sm font-medium text-gray-700 mb-1">
            Mã Tài Sản
          </label>
          <div className="relative">
            <select id="asset-selector" value={selectedAsset} onChange={e => setSelectedAsset(e.target.value)} className="appearance-none block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled={loading}>
              {loading ? <option>Đang tải...</option> : assets.map(asset => <option key={asset} value={asset}>
                    {asset}
                  </option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDownIcon size={16} />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chân trời Dự báo
          </label>
          <div id="horizon-selector" className="flex space-x-2">
            {horizonOptions.map(horizon => <button key={horizon} onClick={() => setForecastHorizon(horizon)} className={`px-3 py-1.5 text-sm rounded-md ${forecastHorizon === horizon ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {horizon}
              </button>)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chế độ XAI
          </label>
          <div id="xai-selector" className="flex space-x-2">
            {xaiOptions.map(mode => <button key={mode} onClick={() => setXaiMode(mode)} className={`px-3 py-1.5 text-sm rounded-md ${xaiMode === mode ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {mode}
              </button>)}
          </div>
        </div>
        <div className="ml-auto">
          <button id="predict-button" onClick={onPredict} disabled={predicting} className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${predicting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            {predicting ? <>
                <LoaderIcon size={16} className="animate-spin mr-2" />
                Đang xử lý...
              </> : <>
                <BarChart2Icon size={16} className="mr-2" />
                Dự đoán Tiếp theo
              </>}
          </button>
        </div>
      </div>
    </div>;
};
export default ControlPanel;