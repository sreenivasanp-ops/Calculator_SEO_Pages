
import { Search, Menu, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center px-4 py-3">
        <div className="flex items-center">
          <div className="bg-indiamart-teal w-8 h-8 rounded flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">M</span>
          </div>
        </div>
        
        <div className="flex-1 mx-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search IndiaMART"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indiamart-teal"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
