import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/layout/Navbar';
import { UserIcon, LockIcon, ListIcon, BellIcon, LoaderIcon, CheckIcon, XIcon } from 'lucide-react';
const Profile: React.FC = () => {
  const {
    watchlist,
    setWatchlist,
    isLoggedIn
  } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [newAsset, setNewAsset] = useState('');
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }
    setLoading(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Đã cập nhật mật khẩu thành công');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Không thể cập nhật mật khẩu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAsset && !watchlist.includes(newAsset)) {
      setWatchlist([...watchlist, newAsset.toUpperCase()]);
      setNewAsset('');
    }
  };
  const handleRemoveFromWatchlist = (asset: string) => {
    setWatchlist(watchlist.filter(item => item !== asset));
  };
  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Tài khoản của tôi
        </h1>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button onClick={() => setActiveTab('account')} className={`py-4 px-6 text-sm font-medium flex items-center ${activeTab === 'account' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <UserIcon size={16} className="mr-2" />
                Thông tin tài khoản
              </button>
              <button onClick={() => setActiveTab('security')} className={`py-4 px-6 text-sm font-medium flex items-center ${activeTab === 'security' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <LockIcon size={16} className="mr-2" />
                Bảo mật
              </button>
              <button onClick={() => setActiveTab('watchlist')} className={`py-4 px-6 text-sm font-medium flex items-center ${activeTab === 'watchlist' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <ListIcon size={16} className="mr-2" />
                Danh mục theo dõi
              </button>
              <button onClick={() => setActiveTab('alerts')} className={`py-4 px-6 text-sm font-medium flex items-center ${activeTab === 'alerts' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                <BellIcon size={16} className="mr-2" />
                Lịch sử cảnh báo
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'account' && <div className="max-w-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Thông tin cá nhân
                </h2>
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Họ và tên</p>
                      <p className="font-medium">Nguyễn Văn A</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">nguyenvana@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày tham gia</p>
                      <p className="font-medium">01/01/2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loại tài khoản</p>
                      <p className="font-medium">Premium</p>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cập nhật thông tin
                </button>
              </div>}
            {activeTab === 'security' && <div className="max-w-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Đổi mật khẩu
                </h2>
                {success && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
                    <CheckIcon size={16} className="mr-2 mt-0.5" />
                    <span>{success}</span>
                  </div>}
                {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
                    <XIcon size={16} className="mr-2 mt-0.5" />
                    <span>{error}</span>
                  </div>}
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu hiện tại
                    </label>
                    <input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu mới
                    </label>
                    <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Xác nhận mật khẩu mới
                    </label>
                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <button type="submit" disabled={loading} className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                      {loading ? <>
                          <LoaderIcon size={16} className="animate-spin mr-2" />
                          Đang xử lý...
                        </> : 'Cập nhật mật khẩu'}
                    </button>
                  </div>
                </form>
              </div>}
            {activeTab === 'watchlist' && <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Danh mục theo dõi
                </h2>
                <form onSubmit={handleAddToWatchlist} className="flex mb-6 max-w-md">
                  <input type="text" value={newAsset} onChange={e => setNewAsset(e.target.value)} placeholder="Nhập mã cổ phiếu (VNM, FPT...)" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md" />
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Thêm
                  </button>
                </form>
                <div className="bg-gray-50 rounded-md">
                  {watchlist.length === 0 ? <div className="p-4 text-center text-gray-500">
                      Bạn chưa thêm mã cổ phiếu nào vào danh mục theo dõi
                    </div> : <ul className="divide-y divide-gray-200">
                      {watchlist.map(asset => <li key={asset} className="flex justify-between items-center p-4">
                          <span className="font-medium">{asset}</span>
                          <button onClick={() => handleRemoveFromWatchlist(asset)} className="text-red-600 hover:text-red-900">
                            <XIcon size={16} />
                          </button>
                        </li>)}
                    </ul>}
                </div>
              </div>}
            {activeTab === 'alerts' && <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Lịch sử cảnh báo
                </h2>
                <div className="bg-gray-50 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mã CP
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại cảnh báo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nội dung
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          10/05/2023 09:30
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          FPT
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Mua
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          FPT đã vượt qua ngưỡng kháng cự 85,000 với khối lượng
                          lớn
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          08/05/2023 14:15
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          VNM
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Bán
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          VNM đã phá vỡ đường hỗ trợ MA20
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          05/05/2023 10:45
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          HPG
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Theo dõi
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          HPG đang tiến gần đến vùng kháng cự quan trọng
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>}
          </div>
        </div>
      </main>
    </div>;
};
export default Profile;