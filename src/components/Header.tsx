
import { Search, Menu, Mic, Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-indiamart-teal shadow-sm">
      <div className="flex items-center px-2 py-2 max-w-full">
        {/* Hamburger menu */}
        <button className="p-1.5 mr-2 flex-shrink-0">
          <Menu className="w-5 h-5 text-white" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center mr-2 flex-shrink-0">
          <img 
            src="/lovable-uploads/356f1c37-af1a-4965-a0f0-92829a4ab7e3.png" 
            alt="IndiaMART" 
            className="w-7 h-7 rounded-full object-cover"
          />
        </div>
        
        {/* Search bar */}
        <div className="flex-1 relative min-w-0">
          <div className="bg-white rounded flex items-center">
            <Search className="ml-2 text-gray-400 w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search IndiaMART"
              className="flex-1 px-2 py-1.5 text-sm focus:outline-none rounded min-w-0"
            />
            <button className="p-1.5 flex-shrink-0">
              <Camera className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1.5 mr-1 flex-shrink-0">
              <Mic className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
