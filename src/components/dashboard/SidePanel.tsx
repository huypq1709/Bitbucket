import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useFundamentalData, useNews } from '../../hooks/useApi';
import { InfoIcon, ListIcon, NewspaperIcon, ExternalLinkIcon, LoaderIcon } from 'lucide-react';
const SidePanel: React.FC = () => {
  const {
    selectedAsset,
    setSelectedAsset,
    watchlist
  } = useAppContext();
  const [activeTab, setActiveTab] = useState('info');
  const {
    fundamentalData,
    loading: loadingFundamental
  } = useFundamentalData(selectedAsset);
  const {
    news,
    loading: loadingNews
  } = useNews(selectedAsset);
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button onClick={() => setActiveTab('info')} className={`py-2 px-3 text-xs font-medium flex items-center ${activeTab === 'info' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            <InfoIcon size={14} className="mr-1" />
            Thông tin
          </button>
          <button onClick={() => setActiveTab('watchlist')} className={`py-2 px-3 text-xs font-medium flex items-center ${activeTab === 'watchlist' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            <ListIcon size={14} className="mr-1" />
            Theo dõi
          </button>
          <button onClick={() => setActiveTab('news')} className={`py-2 px-3 text-xs font-medium flex items-center ${activeTab === 'news' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            <NewspaperIcon size={14} className="mr-1" />
            Tin tức
          </button>
        </nav>
      </div>
      <div className="p-3 overflow-y-auto h-[calc(100%-37px)]">
        {activeTab === 'info' && <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedAsset} - Thông tin cơ bản
            </h3>
            {loadingFundamental ? <div className="flex justify-center items-center h-40">
                <LoaderIcon size={24} className="animate-spin text-indigo-500" />
              </div> : <div className="space-y-3">
                {fundamentalData && Object.entries(fundamentalData).map(([key, value]) => <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-500">
                        {key === 'market_cap' && 'Vốn hóa'}
                        {key === 'pe_ratio' && 'P/E'}
                        {key === 'eps' && 'EPS'}
                        {key === 'dividend_yield' && 'Tỷ suất cổ tức'}
                        {key === 'beta' && 'Beta'}
                        {key === 'avg_volume' && 'Khối lượng TB'}
                        {key === 'high_52w' && 'Cao nhất 52 tuần'}
                        {key === 'low_52w' && 'Thấp nhất 52 tuần'}
                      </span>
                      <span className="text-sm font-medium">
                        {value as string}
                      </span>
                    </div>)}
              </div>}
          </div>}
        {activeTab === 'watchlist' && <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Danh mục Theo dõi
            </h3>
            <div className="space-y-1">
              {watchlist.map(asset => <button key={asset} onClick={() => setSelectedAsset(asset)} className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedAsset === asset ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}>
                  {asset}
                </button>)}
            </div>
          </div>}
        {activeTab === 'news' && <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tin tức {selectedAsset}
            </h3>
            {loadingNews ? <div className="flex justify-center items-center h-40">
                <LoaderIcon size={24} className="animate-spin text-indigo-500" />
              </div> : <div className="space-y-3">
                {news.map((item, index) => <div key={index} className="border-b border-gray-100 pb-3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start hover:bg-gray-50 p-2 rounded-md">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.date || 'Hôm nay'}
                        </p>
                      </div>
                      <ExternalLinkIcon size={14} className="text-gray-400 ml-2" />
                    </a>
                  </div>)}
              </div>}
          </div>}
      </div>
    </div>;
};
export default SidePanel;