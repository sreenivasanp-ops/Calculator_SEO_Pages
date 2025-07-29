
import { Search, Menu, Mic, Camera, ChevronDown, ShoppingBag, HelpCircle, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import NavigationMenu from '@/components/NavigationMenu';

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        {/* Mobile Header */}
        <div className="flex items-center px-2 py-2 max-w-full md:hidden">
          {/* Hamburger menu */}
          <button 
            className="p-1.5 mr-2 flex-shrink-0"
            onClick={() => setIsSheetOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center mr-2 flex-shrink-0">
            <img 
              src="/lovable-uploads/a1ef4a30-1ecb-43da-8b6d-5a568da3e769.png" 
              alt="IndiaMART" 
              className="w-7 h-7 rounded-full object-cover"
            />
          </Link>
          
          {/* Search bar */}
          <div className="flex-1 relative min-w-0">
            <div className="bg-gray-100 rounded flex items-center">
              <Search className="ml-2 text-gray-400 w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search IndiaMART"
                className="flex-1 px-2 py-1.5 text-sm focus:outline-none rounded min-w-0 bg-transparent"
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

        {/* Desktop Header */}
        <div className="hidden md:flex items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-8 flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-blue-600 font-bold text-xl">indiamart</span>
            </div>
          </Link>
          
          {/* Search bar - centered and wider */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="bg-gray-100 rounded-lg flex items-center px-4 py-2">
              <Search className="text-gray-400 w-5 h-5 flex-shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Search products, services, brands and more"
                className="flex-1 text-sm focus:outline-none bg-transparent placeholder-gray-500"
              />
              <button className="p-1 flex-shrink-0 ml-2">
                <Camera className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1 flex-shrink-0">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
              <ShoppingBag className="w-5 h-5 mr-1" />
              Shopping
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
              Sell
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
              <HelpCircle className="w-5 h-5 mr-1" />
              Help
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium relative">
              <MessageSquare className="w-5 h-5 mr-1" />
              Messages
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                99+
              </Badge>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
              Hi
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="bg-indiamart-teal text-white p-4">
            <SheetTitle className="text-left text-white">Hi User</SheetTitle>
          </SheetHeader>
          <NavigationMenu />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
