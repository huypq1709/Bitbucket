import React, { useState, createElement } from 'react';
import { Download } from 'lucide-react';
interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
}
interface HistoricalDataTableProps {
  data?: HistoricalData[];
}
const HistoricalDataTable: React.FC<HistoricalDataTableProps> = ({
  data = []
}) => {
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // Early return if no data
  if (!data || data.length === 0) {
    return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="text-center text-gray-500">
          Không có dữ liệu để hiển thị
        </div>
      </div>;
  }
  const filteredData = data.filter(item => item.date.toLowerCase().includes(searchDate.toLowerCase()));
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const handleDownloadCSV = () => {
    const headers = ['DATE', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'ADJ CLOSE', 'VOLUME'];
    const csvData = [headers.join(','), ...filteredData.map(row => [row.date, row.open, row.high, row.low, row.close, row.adjClose, row.volume].join(','))].join('\n');
    const blob = new Blob([csvData], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historical_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900">Dữ liệu lịch sử</h3>
          <button onClick={handleDownloadCSV} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Download size={16} className="mr-2" />
            Tải CSV
          </button>
        </div>
        <input type="text" placeholder="Tìm theo ngày..." value={searchDate} onChange={e => setSearchDate(e.target.value)} className="w-full sm:w-64 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="overflow-y-auto" style={{
      height: 'calc(100% - 110px)'
    }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mở cửa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cao
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thấp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đóng cửa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đóng cửa điều chỉnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khối lượng
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.open.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.high.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.low.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.close.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.adjClose.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.volume.toLocaleString()}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-700">
              Số dòng mỗi trang:
            </span>
            <select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              Trước
            </button>
            <span className="text-sm text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default HistoricalDataTable;