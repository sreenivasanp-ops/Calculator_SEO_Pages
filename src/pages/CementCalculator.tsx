import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import CementRelatedCategories from '@/components/CementRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const CementCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('feet');
  const [cementType, setCementType] = useState('OPC 43 Grade');
  const [cementPrice, setCementPrice] = useState('');
  const [bags, setBags] = useState('');
  const [totalCost, setTotalCost] = useState('');

  const calculateCement = () => {
    if (!length || !width || !height) return;

    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const price = parseFloat(cementPrice) || 300;

    let volume = l * w * h;
    if (unit === 'meter') {
      volume = volume; // Already in cubic meters
    } else {
      volume = volume / 35.315; // Convert cubic feet to cubic meters
    }

    const ratio = cementType === 'OPC 43 Grade' ? 7 : 5;
    const cementVolume = volume * ratio;
    const bagsNeeded = cementVolume / 0.035;
    const roundedBags = Math.ceil(bagsNeeded);
    const cost = roundedBags * price;

    setBags(roundedBags.toString());
    setTotalCost(cost.toFixed(2));
  };

  const clearAll = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setUnit('feet');
    setCementType('OPC 43 Grade');
    setCementPrice('');
    setBags('');
    setTotalCost('');
  };

  const cementGuide = [
    { title: 'OPC (Ordinary Portland Cement)', description: 'Most common type, suitable for general construction.' },
    { title: 'PPC (Pozzolana Portland Cement)', description: 'Eco-friendly, good for mass concrete works.' },
    { title: 'Rapid Hardening Cement', description: 'For quick setting, used in road repairs.' },
    { title: 'Low Heat Cement', description: 'Generates less heat, ideal for large dams.' },
    { title: 'Sulphate Resisting Cement', description: 'Resists sulphate attack, used in marine structures.' }
  ];

  const applications = [
    { title: 'Residential Buildings', description: 'For foundations, walls, and roofs.' },
    { title: 'Commercial Complexes', description: 'For high-rise buildings and infrastructure.' },
    { title: 'Road Construction', description: 'For pavements and bridges.' },
    { title: 'Water Retaining Structures', description: 'For dams, reservoirs, and canals.' },
    { title: 'Marine Construction', description: 'For ports, harbors, and coastal structures.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Calculate Cement for Your Project – Bags and Cost Estimator
        </h1>
        
        {/* Cement Calculator Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-teal-200">
          <CardHeader className="bg-teal-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              🧮 Cement Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Estimate Cement Bags and Cost for Your Construction
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <Input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Enter length"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Enter width"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 focus:border-teal-300 text-sm"
                >
                  <option value="feet">Feet</option>
                  <option value="meter">Meter</option>
                </select>
              </div>
            </div>

            {/* Cement Type and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cement Type</label>
                <select
                  value={cementType}
                  onChange={(e) => setCementType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 focus:border-teal-300 text-sm"
                >
                  <option value="OPC 43 Grade">OPC 43 Grade</option>
                  <option value="OPC 53 Grade">OPC 53 Grade</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cement Price (₹ per bag)</label>
                <Input
                  type="number"
                  value={cementPrice}
                  onChange={(e) => setCementPrice(e.target.value)}
                  placeholder="Enter price per bag"
                  className="w-full"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <Button
                onClick={calculateCement}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg font-semibold"
                disabled={!length || !width || !height}
              >
                CALCULATE
              </Button>
            </div>

            {/* Results */}
            {bags && totalCost && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Results</h3>
                <p className="text-sm text-gray-700">
                  Estimated bags needed: <span className="font-medium">{bags}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Estimated total cost: <span className="font-medium">₹{totalCost}</span>
                </p>
              </div>
            )}

            {/* Clear Button */}
            <div className="flex justify-center">
              <Button
                onClick={clearAll}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Explore Related Categories */}
        <CementRelatedCategories />

        {/* Cement Guide Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Cement Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            {cementGuide.map((item, index) => (
              <div key={index}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applications Section */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            {applications.map((item, index) => (
              <div key={index}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CementCalculator;
