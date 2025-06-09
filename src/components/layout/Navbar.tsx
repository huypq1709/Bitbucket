import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { BarChart2Icon, UserIcon, LogInIcon, LogOutIcon } from 'lucide-react';
const Navbar: React.FC = () => {
  const {
    isLoggedIn,
    setIsLoggedIn
  } = useAppContext();
  const location = useLocation();
  return <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <BarChart2Icon size={24} className="text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  FinAnalytics
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? <>
                <Link to="/profile" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${location.pathname === '/profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  <UserIcon size={16} className="mr-1" />
                  Tài khoản
                </Link>
                <button onClick={() => setIsLoggedIn(false)} className="ml-4 px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-500 hover:text-gray-700">
                  <LogOutIcon size={16} className="mr-1" />
                  Đăng xuất
                </button>
              </> : <>
                <Link to="/login" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${location.pathname === '/login' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  <LogInIcon size={16} className="mr-1" />
                  Đăng nhập
                </Link>
                <Link to="/register" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Đăng ký
                </Link>
              </>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;