
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Cpu, Sun, Battery, Building2, Search, Blocks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BuyerAssistant = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  // TMT Calculator States
  const tmtData = [
    { diameter: '8mm', weightPerMeter: 0.395, weightPerFeet: 0.1204, weightPer12m: 4.74 },
    { diameter: '10mm', weightPerMeter: 0.617, weightPerFeet: 0.1881, weightPer12m: 7.40 },
    { diameter: '12mm', weightPerMeter: 0.888, weightPerFeet: 0.2706, weightPer12m: 10.66 },
    { diameter: '16mm', weightPerMeter: 1.580, weightPerFeet: 0.4814, weightPer12m: 18.96 },
    { diameter: '20mm', weightPerMeter: 2.470, weightPerFeet: 0.7529, weightPer12m: 29.64 },
    { diameter: '25mm', weightPerMeter: 3.850, weightPerFeet: 1.1722, weightPer12m: 46.20 },
    { diameter: '32mm', weightPerMeter: 6.320, weightPerFeet: 1.9266, weightPer12m: 75.84 }
  ];

  const rodsPerBundle = {
    '8mm': 10, '10mm': 7, '12mm': 5, '16mm': 3, '20mm': 2, '25mm': 1, '32mm': 1
  };

  const [tmtCalculatorData, setTmtCalculatorData] = useState(
    tmtData.map(item => ({
      diameter: item.diameter, rods: 0, bundles: 0, bundleRods: 0, weight: 0, price: 0, weightPer12m: item.weightPer12m
    }))
  );

  const [tmtCalculated, setTmtCalculated] = useState(false);
  const pricePerKg = 62;

  // Brickwork Calculator States
  const [wallLength, setWallLength] = useState('');
  const [wallLengthUnit, setWallLengthUnit] = useState('feet');
  const [wallHeight, setWallHeight] = useState('');
  const [wallHeightUnit, setWallHeightUnit] = useState('feet');
  const [wallThickness, setWallThickness] = useState('');
  const [wallThicknessUnit, setWallThicknessUnit] = useState('feet');
  const [mortarRatio, setMortarRatio] = useState('1:4');
  const [brickLength, setBrickLength] = useState('');
  const [brickLengthUnit, setBrickLengthUnit] = useState('cm');
  const [brickWidth, setBrickWidth] = useState('');
  const [brickWidthUnit, setBrickWidthUnit] = useState('cm');
  const [brickHeight, setBrickHeight] = useState('');
  const [brickHeightUnit, setBrickHeightUnit] = useState('cm');
  const [brickResults, setBrickResults] = useState({
    bricks: '', cementBags: '', looseCement: '', looseCementBags: '', looseCementKg: '', sand: '', brickPrice: '', cementPrice: '', sandPrice: '', totalPrice: ''
  });

  // Concrete Calculator States  
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState('meter');
  const [width, setWidth] = useState('');
  const [widthUnit, setWidthUnit] = useState('meter');
  const [depth, setDepth] = useState('');
  const [depthUnit, setDepthUnit] = useState('cm');
  const [gradeOfConcrete, setGradeOfConcrete] = useState('M20 (1:1.5:3)');
  const [concreteResults, setConcreteResults] = useState({
    cementBags: '', looseCementKg: '', sand: '', aggregate: '', cementPrice: '', sandPrice: '', aggregatePrice: '', totalPrice: '', concreteVolume: ''
  });

  // Calculator Functions
  const handleTmtInputChange = (index: number, field: string, value: string) => {
    const numValue = Math.max(0, parseFloat(value) || 0);
    const diameter = tmtCalculatorData[index].diameter;
    const rodsPerBundleForDia = rodsPerBundle[diameter];
    
    setTmtCalculatorData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: numValue };
      
      if (field === 'rods') {
        const totalRods = numValue;
        const fullBundles = Math.floor(totalRods / rodsPerBundleForDia);
        const remainingRods = totalRods % rodsPerBundleForDia;
        newData[index].bundles = fullBundles;
        newData[index].bundleRods = remainingRods;
        newData[index].weight = totalRods * newData[index].weightPer12m;
        newData[index].price = newData[index].weight * pricePerKg;
      } else if (field === 'bundles') {
        const totalRodsFromBundles = numValue * rodsPerBundleForDia;
        newData[index].rods = totalRodsFromBundles;
        newData[index].bundleRods = 0;
        newData[index].weight = totalRodsFromBundles * newData[index].weightPer12m;
        newData[index].price = newData[index].weight * pricePerKg;
      }
      return newData;
    });
  };

  const calculateTmtTotals = () => {
    setTmtCalculatorData(prev => 
      prev.map(item => {
        const totalRods = item.rods;
        const weight = totalRods * item.weightPer12m;
        const price = weight * pricePerKg;
        return { ...item, weight, price };
      })
    );
    setTmtCalculated(true);
  };

  const convertToMeters = (value: string, unit: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;
    switch(unit) {
      case 'feet': return val * 0.3048;
      case 'meter': return val;
      case 'inch': return val * 0.0254;
      case 'cm': return val * 0.01;
      default: return val;
    }
  };

  const buildingItems = [
    {
      title: 'TMT Bars',
      icon: BarChart3,
      description: 'TMT Steel Bars & Rods',
      onClick: () => setOpenDialog('tmt'),
      searchTerms: ['tmt', 'bars', 'steel', 'rods']
    },
    {
      title: 'Brickwork',
      icon: Building2,
      description: 'Brickwork Calculator for Construction',
      onClick: () => setOpenDialog('brickwork'),
      searchTerms: ['brickwork', 'calculator', 'construction', 'brick']
    },
    {
      title: 'Concrete',
      icon: Blocks,
      description: 'Concrete Calculator for Construction',
      onClick: () => setOpenDialog('concrete'),
      searchTerms: ['concrete', 'calculator', 'construction', 'cement']
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
      title: 'Solar',
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
              placeholder="Search categories (TMT Bars, Brickwork, Concrete, Resistors, Solar Panel, Inverter Battery)"
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

        {/* TMT Calculator Dialog */}
        <Dialog open={openDialog === 'tmt'} onOpenChange={(open) => setOpenDialog(open ? 'tmt' : null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">🧮 TMT Bar Calculator</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="overflow-x-hidden rounded-lg border border-gray-200">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-teal-500 hover:bg-teal-500">
                      <TableHead className="text-white font-semibold text-center text-sm p-2 w-[15%]">Diameter</TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-2 w-[20%]">Rods</TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-2 w-[25%]">
                        <div className="flex flex-col">
                          <span>Bundles</span>
                          <div className="flex justify-center gap-2 text-xs mt-1">
                            <span className="w-10">B</span>
                            <span className="w-8">R</span>
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-2 w-[20%]">Weight in Kg</TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-2 w-[20%]">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tmtCalculatorData.map((row, index) => (
                      <TableRow key={row.diameter} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-center text-sm p-2">{row.diameter}</TableCell>
                        <TableCell className="text-center p-1">
                          <Input
                            type="number"
                            min="0"
                            value={row.rods || ''}
                            onChange={(e) => handleTmtInputChange(index, 'rods', e.target.value)}
                            className="w-16 h-8 text-center text-xs border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-1 mx-auto"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell className="text-center p-1">
                          <div className="flex justify-center gap-0.5">
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              value={row.bundles || ''}
                              onChange={(e) => handleTmtInputChange(index, 'bundles', e.target.value)}
                              className="w-16 h-8 text-center text-xs border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-1"
                              placeholder="0"
                            />
                            <div className="w-12 h-8 flex items-center justify-center bg-gray-100 rounded border text-xs text-gray-600">
                              {row.bundleRods}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium text-blue-600 text-sm p-2">
                          {row.weight.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center font-medium text-green-600 text-sm p-2">
                          ₹{row.price.toFixed(0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  onClick={calculateTmtTotals}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2"
                >
                  Calculate
                </Button>
                <Button 
                  onClick={() => {
                    setTmtCalculatorData(tmtData.map(item => ({
                      diameter: item.diameter, rods: 0, bundles: 0, bundleRods: 0, weight: 0, price: 0, weightPer12m: item.weightPer12m
                    })));
                    setTmtCalculated(false);
                  }}
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-2"
                >
                  Clear All
                </Button>
              </div>

              {tmtCalculated && (
                <Card className="mt-6 border-2 border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-center">Total Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Rods</p>
                        <p className="text-2xl font-bold text-orange-500">{tmtCalculatorData.reduce((sum, item) => sum + item.rods, 0)}</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Est. Price</p>
                        <p className="text-2xl font-bold text-blue-500">₹{tmtCalculatorData.reduce((sum, item) => sum + item.price, 0).toFixed(0)}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Weight</p>
                        <p className="text-2xl font-bold text-green-500">{tmtCalculatorData.reduce((sum, item) => sum + item.weight, 0).toFixed(2)} Kg</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Brickwork Calculator Dialog */}
        <Dialog open={openDialog === 'brickwork'} onOpenChange={(open) => setOpenDialog(open ? 'brickwork' : null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">🧱 Brickwork Calculator</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Wall Dimensions Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Wall Dimensions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                    <div className="flex gap-2">
                      <Input 
                        value={wallLength} 
                        onChange={(e) => setWallLength(e.target.value)} 
                        placeholder=""
                        className="flex-1"
                      />
                      <Select value={wallLengthUnit} onValueChange={setWallLengthUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feet">feet</SelectItem>
                          <SelectItem value="meter">meter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <div className="flex gap-2">
                      <Input 
                        value={wallHeight} 
                        onChange={(e) => setWallHeight(e.target.value)} 
                        placeholder=""
                        className="flex-1"
                      />
                      <Select value={wallHeightUnit} onValueChange={setWallHeightUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feet">feet</SelectItem>
                          <SelectItem value="meter">meter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thickness</label>
                    <div className="flex gap-2">
                      <Input 
                        value={wallThickness} 
                        onChange={(e) => setWallThickness(e.target.value)} 
                        placeholder=""
                        className="flex-1"
                      />
                      <Select value={wallThicknessUnit} onValueChange={setWallThicknessUnit}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feet">feet</SelectItem>
                          <SelectItem value="meter">meter</SelectItem>
                          <SelectItem value="inch">inch</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size of Brick Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Size of Brick</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                    <div className="flex gap-2">
                      <Input 
                        value={brickLength} 
                        onChange={(e) => setBrickLength(e.target.value)} 
                        placeholder=""
                        className="flex-1"
                      />
                      <Select value={brickLengthUnit} onValueChange={setBrickLengthUnit}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="inch">inch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                    <div className="flex gap-2">
                      <Input 
                        value={brickWidth} 
                        onChange={(e) => setBrickWidth(e.target.value)} 
                        placeholder=""
                        className="flex-1"
                      />
                      <Select value={brickWidthUnit} onValueChange={setBrickWidthUnit}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="inch">inch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <div className="flex gap-2">
                      <Input 
                        value={brickHeight} 
                        onChange={(e) => setBrickHeight(e.target.value)} 
                        placeholder=""
                        className="flex-1"
                      />
                      <Select value={brickHeightUnit} onValueChange={setBrickHeightUnit}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="inch">inch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => {
                    if (!wallLength || !wallHeight || !wallThickness || !brickLength || !brickWidth || !brickHeight) {
                      alert('Please fill all fields');
                      return;
                    }
                    // Add calculation logic here - simplified for demo
                    setBrickResults({
                      bricks: '500', cementBags: '10', looseCement: '2.5', looseCementBags: '2', looseCementKg: '25', sand: '1.5', brickPrice: '4250', cementPrice: '3650', sandPrice: '1875', totalPrice: '9775'
                    });
                  }}
                  className="bg-gradient-to-r from-indiamart-teal to-blue-600 hover:from-indiamart-teal/90 hover:to-blue-700 text-white px-8 py-3"
                >
                  CALCULATE
                </Button>
                <Button 
                  onClick={() => {
                    setWallLength(''); setWallHeight(''); setWallThickness(''); setBrickLength(''); setBrickWidth(''); setBrickHeight('');
                    setBrickResults({ bricks: '', cementBags: '', looseCement: '', looseCementBags: '', looseCementKg: '', sand: '', brickPrice: '', cementPrice: '', sandPrice: '', totalPrice: '' });
                  }}
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
                >
                  CLEAR ALL
                </Button>
              </div>

              {brickResults.bricks && (
                <Card className="mt-6 border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">Calculation Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl">🧱</div>
                        <div className="text-sm text-gray-600 mb-1">Bricks</div>
                        <div className="text-lg font-bold text-indiamart-teal">{brickResults.bricks}</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl">🏗️</div>
                        <div className="text-sm text-gray-600 mb-1">Cement</div>
                        <div className="text-lg font-bold text-blue-600">{brickResults.cementBags} Bags</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl">⛰️</div>
                        <div className="text-sm text-gray-600 mb-1">Sand</div>
                        <div className="text-lg font-bold text-green-600">{brickResults.sand} ton</div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">Total Estimated Price</div>
                        <div className="text-2xl font-bold text-green-600 mt-2">₹{brickResults.totalPrice}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Concrete Calculator Dialog */}
        <Dialog open={openDialog === 'concrete'} onOpenChange={(open) => setOpenDialog(open ? 'concrete' : null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">🏗️ Concrete Calculator</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade of Concrete</label>
                <Select value={gradeOfConcrete} onValueChange={setGradeOfConcrete}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M25 (1:1:2)">M25 (1:1:2)</SelectItem>
                    <SelectItem value="M20 (1:1.5:3)">M20 (1:1.5:3)</SelectItem>
                    <SelectItem value="M15 (1:2:4)">M15 (1:2:4)</SelectItem>
                    <SelectItem value="M10 (1:3:6)">M10 (1:3:6)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                  <div className="flex gap-2">
                    <Input 
                      value={length} 
                      onChange={(e) => setLength(e.target.value)} 
                      placeholder=""
                      className="flex-1"
                    />
                    <Select value={lengthUnit} onValueChange={setLengthUnit}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meter">meter</SelectItem>
                        <SelectItem value="feet">feet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                  <div className="flex gap-2">
                    <Input 
                      value={width} 
                      onChange={(e) => setWidth(e.target.value)} 
                      placeholder=""
                      className="flex-1"
                    />
                    <Select value={widthUnit} onValueChange={setWidthUnit}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meter">meter</SelectItem>
                        <SelectItem value="feet">feet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Depth</label>
                  <div className="flex gap-2">
                    <Input 
                      value={depth} 
                      onChange={(e) => setDepth(e.target.value)} 
                      placeholder=""
                      className="flex-1"
                    />
                    <Select value={depthUnit} onValueChange={setDepthUnit}>
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="inch">inch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => {
                    if (!length || !width || !depth) {
                      alert('Please fill all fields');
                      return;
                    }
                    // Add calculation logic here - simplified for demo
                    setConcreteResults({
                      cementBags: '8', looseCementKg: '15', sand: '2.1', aggregate: '4.2', cementPrice: '2920', sandPrice: '2625', aggregatePrice: '6720', totalPrice: '12265', concreteVolume: '3.5'
                    });
                  }}
                  className="bg-gradient-to-r from-indiamart-teal to-blue-600 hover:from-indiamart-teal/90 hover:to-blue-700 text-white px-8 py-3"
                >
                  CALCULATE
                </Button>
                <Button 
                  onClick={() => {
                    setLength(''); setWidth(''); setDepth('');
                    setConcreteResults({ cementBags: '', looseCementKg: '', sand: '', aggregate: '', cementPrice: '', sandPrice: '', aggregatePrice: '', totalPrice: '', concreteVolume: '' });
                  }}
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
                >
                  CLEAR ALL
                </Button>
              </div>

              {concreteResults.cementBags && (
                <Card className="mt-6 border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">Calculation Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Total Volume of Concrete</div>
                        <div className="text-xl font-bold text-blue-600">{concreteResults.concreteVolume} m³</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl">🏗️</div>
                        <div className="text-sm text-gray-600 mb-1">Cement</div>
                        <div className="text-lg font-bold text-indiamart-teal">{concreteResults.cementBags} Bags</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl">⛰️</div>
                        <div className="text-sm text-gray-600 mb-1">Sand</div>
                        <div className="text-lg font-bold text-blue-600">{concreteResults.sand} Ton</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl">🪨</div>
                        <div className="text-sm text-gray-600 mb-1">Aggregate</div>
                        <div className="text-lg font-bold text-green-600">{concreteResults.aggregate} Ton</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">Total Estimated Price</div>
                        <div className="text-2xl font-bold text-green-600 mt-2">₹{concreteResults.totalPrice}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BuyerAssistant;
