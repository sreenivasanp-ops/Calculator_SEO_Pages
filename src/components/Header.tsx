
import { Search, Menu, Mic, Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-indiamart-teal shadow-sm">
      <div className="flex items-center px-3 py-2">
        {/* Hamburger menu */}
        <button className="p-2 mr-2">
          <Menu className="w-5 h-5 text-white" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center mr-3">
          <img 
            src="/lovable-uploads/bf91f851-8056-4389-8db8-60311c0748df.png" 
            alt="IndiaMART" 
            className="w-8 h-8 rounded-full"
          />
        </div>
        
        {/* Search bar */}
        <div className="flex-1 relative">
          <div className="bg-white rounded flex items-center">
            <Search className="ml-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search IndiaMART"
              className="flex-1 px-3 py-2 text-sm focus:outline-none rounded"
            />
            <button className="p-2">
              <Camera className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 mr-1">
              <Mic className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
