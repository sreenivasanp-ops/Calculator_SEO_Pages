
import { Search, Menu, Mic, Camera, ShoppingCart, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import NavigationMenu from '@/components/NavigationMenu';

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <header className="bg-indiamart-teal shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left section - Logo and Mobile Menu */}
            <div className="flex items-center">
              {/* Mobile hamburger menu */}
              <button 
                className="p-1.5 mr-3 md:hidden flex-shrink-0"
                onClick={() => setIsSheetOpen(true)}
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/a1ef4a30-1ecb-43da-8b6d-5a568da3e769.png" 
                  alt="IndiaMART" 
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <span className="text-white font-bold text-lg hidden sm:block">IndiaMART</span>
              </Link>
            </div>

            {/* Center section - Search bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="bg-white rounded-lg flex items-center w-full">
                <Search className="ml-3 text-gray-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for products, services and more..."
                  className="flex-1 px-3 py-2.5 text-sm focus:outline-none rounded-lg"
                />
                <button className="p-2 flex-shrink-0 hover:bg-gray-50 rounded">
                  <Camera className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 mr-1 flex-shrink-0 hover:bg-gray-50 rounded">
                  <Mic className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Right section - Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex items-center space-x-1">
                <ShoppingCart className="w-4 h-4" />
                <span>Shopping</span>
              </Button>
              
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex items-center space-x-1">
                <span>Sell</span>
              </Button>
              
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex items-center space-x-1">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </Button>
              
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex items-center space-x-1 relative">
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  99+
                </Badge>
              </Button>
              
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 flex items-center space-x-1">
                <span>Hi</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile search icon */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-white p-2">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden pb-3">
            <div className="bg-white rounded flex items-center">
              <Search className="ml-2 text-gray-400 w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search IndiaMART"
                className="flex-1 px-2 py-2 text-sm focus:outline-none rounded"
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
