
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

const BuyerAssistant = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    'TMT Bars',
    'Paints', 
    'Tiles',
    'Solar Panel',
    'House Wire',
    'Solar Loan'
  ];

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      
      {/* Main iframe content with added top spacing */}
      <div className="h-[calc(100vh-60px)] overflow-hidden relative pt-8">
        <div className="w-full h-full overflow-hidden relative">
          <iframe
            src="https://buyer-guide-rebuild.lovable.app/buyer-tools"
            className="w-full h-full border-0"
            title="Buyer Assistant Tools"
            scrolling="no"
            style={{
              marginTop: '-80px',
              height: 'calc(100% + 80px)',
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
              width: '133.33%'
            }}
          />
        </div>
      </div>
      
      {/* Category Search Section */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Categories
          </h2>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search categories (TMT Bars, Paints, Tiles, etc.)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-2 border-gray-300 focus:border-indiamart-teal"
            />
          </div>
          
          {/* Category suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery(category)}
                className="border-indiamart-teal text-indiamart-teal hover:bg-indiamart-teal hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <Button className="bg-indiamart-teal hover:bg-indiamart-teal/90 text-white px-6 py-3">
            Search Category
          </Button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          html, body {
            overflow-x: hidden;
          }
          iframe {
            clip-path: inset(80px 0 0 0);
            max-width: none !important;
          }
        `
      }} />
    </div>
  );
};

export default BuyerAssistant;
