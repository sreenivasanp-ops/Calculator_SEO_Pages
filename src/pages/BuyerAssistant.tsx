
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BarChart3, Cpu, Sun, Battery, Hammer, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BuyerAssistant = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const buildingItems = [
    {
      title: 'TMT Bars',
      icon: BarChart3,
      description: 'TMT Steel Bars & Rods',
      onClick: () => navigate('/tmt-bars'),
      searchTerms: ['tmt', 'bars', 'steel', 'rods']
    },
    {
      title: 'Cement',
      icon: Hammer,
      description: 'Cement Calculator for Construction',
      onClick: () => navigate('/cement-calculator'),
      searchTerms: ['cement', 'calculator', 'construction']
    }
  ];

  const electronicsComponentsItems = [
    {
      title: 'Resistors',
      icon: Cpu,
      description: 'Electronic Resistors & Components',
      onClick: () => navigate('/resistors'),
      searchTerms: ['resistors', 'electronic', 'components']
    }
  ];

  const electricalItems = [
    {
      title: 'Solar Panel',
      icon: Sun,
      description: 'Solar Energy Solutions',
      onClick: () => navigate('/solar-panel'),
      searchTerms: ['solar', 'panel', 'energy', 'solutions']
    }
  ];

  const consumerElectronicsItems = [
    {
      title: 'Inverter Battery',
      icon: Battery,
      description: 'Uninterruptible Power Supply',
      onClick: () => navigate('/inverter-calculator'),
      searchTerms: ['inverter', 'battery', 'power', 'supply', 'invertor']
    }
  ];

  // Combine all items for search
  const allItems = [
    ...buildingItems,
    ...electronicsComponentsItems,
    ...electricalItems,
    ...consumerElectronicsItems
  ];

  // Filter items based on search term
  const filteredItems = searchTerm.trim() === '' ? allItems : allItems.filter(item =>
    item.searchTerms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered items back into categories
  const getFilteredItemsByCategory = (categoryItems: typeof buildingItems) => {
    return categoryItems.filter(item => filteredItems.includes(item));
  };

  const handleSearchItemClick = (item: typeof allItems[0]) => {
    item.onClick();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Buyer Assistant & guides
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search categories (TMT Bars, Cement, Resistors, Solar Panel, Inverter Battery)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-lg focus:border-indiamart-teal"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm.trim() !== '' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Search Results ({filteredItems.length} found)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card 
                  key={item.title} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSearchItemClick(item)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <item.icon className="w-6 h-6 text-indiamart-teal" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Show categories only when not searching or no results */}
        {(searchTerm.trim() === '' || filteredItems.length === 0) && (
          <>
            {/* Building & Construction Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Building & Construction
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {buildingItems.map((item) => (
                  <Card 
                    key={item.title} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={item.onClick}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <item.icon className="w-6 h-6 text-indiamart-teal" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Electronics Components & Supplies Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Electronics Components & Supplies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {electronicsComponentsItems.map((item) => (
                  <Card 
                    key={item.title} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={item.onClick}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <item.icon className="w-6 h-6 text-indiamart-teal" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Electrical Equipment & Supplies Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Electrical Equipment & Supplies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {electricalItems.map((item) => (
                  <Card 
                    key={item.title} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={item.onClick}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <item.icon className="w-6 h-6 text-indiamart-teal" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Consumer Electronics & Household Appliances Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Consumer Electronics & Household Appliances
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {consumerElectronicsItems.map((item) => (
                  <Card 
                    key={item.title} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={item.onClick}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <item.icon className="w-6 h-6 text-indiamart-teal" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyerAssistant;
