
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Paintbrush, Square, Sun, Zap, DollarSign, BarChart3, Cpu, Battery } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuyerAssistant = () => {
  const navigate = useNavigate();

  const buildingItems = [
    {
      title: 'TMT Bars',
      icon: BarChart3,
      description: 'TMT Steel Bars & Rods',
      onClick: () => navigate('/tmt-bars')
    },
    {
      title: 'Paints',
      icon: Paintbrush,
      description: 'Interior & Exterior Paints'
    },
    {
      title: 'Tiles',
      icon: Square,
      description: 'Floor & Wall Tiles'
    }
  ];

  const electronicsComponentsItems = [
    {
      title: 'Resistors',
      icon: Cpu,
      description: 'Electronic Resistors & Components'
    }
  ];

  const electricalItems = [
    {
      title: 'Solar Panel',
      icon: Sun,
      description: 'Solar Energy Solutions'
    },
    {
      title: 'House Wire',
      icon: Zap,
      description: 'Electrical Wiring Solutions'
    },
    {
      title: 'Solar Loan',
      icon: DollarSign,
      description: 'Solar Financing Options'
    }
  ];

  const consumerElectronicsItems = [
    {
      title: 'UPS',
      icon: Battery,
      description: 'Uninterruptible Power Supply'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Buyer Assistant & Guides by Category
        </h1>
        
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
              <Card key={item.title} className="hover:shadow-md transition-shadow cursor-pointer">
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
              <Card key={item.title} className="hover:shadow-md transition-shadow cursor-pointer">
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
              <Card key={item.title} className="hover:shadow-md transition-shadow cursor-pointer">
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
      </div>
    </div>
  );
};

export default BuyerAssistant;
