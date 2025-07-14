
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import ExploreRelatedCategories from '@/components/ExploreRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BLForm from '@/components/BLForm';
import { useState } from 'react';

const BrickworkCalculator = () => {
  // Wall Dimensions States
  const [wallLength, setWallLength] = useState('');
  const [wallLengthUnit, setWallLengthUnit] = useState('feet');
  const [wallHeight, setWallHeight] = useState('');
  const [wallHeightUnit, setWallHeightUnit] = useState('feet');
  const [wallThickness, setWallThickness] = useState('');
  const [wallThicknessUnit, setWallThicknessUnit] = useState('feet');
  const [mortarRatio, setMortarRatio] = useState('1:4');

  // Brick Size States
  const [brickLength, setBrickLength] = useState('');
  const [brickLengthUnit, setBrickLengthUnit] = useState('cm');
  const [brickWidth, setBrickWidth] = useState('');
  const [brickWidthUnit, setBrickWidthUnit] = useState('cm');
  const [brickHeight, setBrickHeight] = useState('');
  const [brickHeightUnit, setBrickHeightUnit] = useState('cm');

  // Results States
  const [results, setResults] = useState({
    bricks: '',
    cementBags: '',
    looseCement: '',
    looseCementBags: '',
    looseCementKg: '',
    sand: '',
    brickPrice: '',
    cementPrice: '',
    sandPrice: '',
    totalPrice: ''
  });

  // Convert to meters
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

  const calculateBrickwork = () => {
    if (!wallLength || !wallHeight || !wallThickness || !brickLength || !brickWidth || !brickHeight) {
      alert('Please fill all fields');
      return;
    }

    // Convert all dimensions to meters
    const wallLengthM = convertToMeters(wallLength, wallLengthUnit);
    const wallHeightM = convertToMeters(wallHeight, wallHeightUnit);
    const wallThicknessM = convertToMeters(wallThickness, wallThicknessUnit);
    
    const brickLengthM = convertToMeters(brickLength, brickLengthUnit);
    const brickWidthM = convertToMeters(brickWidth, brickWidthUnit);
    const brickHeightM = convertToMeters(brickHeight, brickHeightUnit);

    // Calculate Volume of Brick Masonry
    const volumeBrickMasonry = wallLengthM * wallHeightM * wallThicknessM;

    // Calculate size of Brick with mortar (adding 1cm = 0.01m to each dimension)
    const brickWithMortarVolume = (brickLengthM + 0.01) * (brickWidthM + 0.01) * (brickHeightM + 0.01);

    // Calculate No of Bricks
    const numberOfBricks = Math.ceil(volumeBrickMasonry / brickWithMortarVolume);

    // Calculate actual brick volume
    const actualBrickVolume = brickLengthM * brickWidthM * brickHeightM;

    // Calculate Quantity of Mortar
    const quantityOfMortar = (volumeBrickMasonry - (numberOfBricks * actualBrickVolume)) * 1.15 * 1.25;

    // Parse mortar ratio
    const ratioNumbers = mortarRatio.split(':').map(n => parseInt(n));
    const sumOfRatio = ratioNumbers.reduce((a, b) => a + b, 0);

    // Calculate No of Bags of cement
    const cementRequired = quantityOfMortar / sumOfRatio / 0.035;
    const cementBags = Math.floor(cementRequired);
    const remainder = cementRequired - cementBags;
    const looseCement = remainder * 50;
    const looseCementBags = Math.floor(looseCement / 50);
    const looseCementKg = Math.ceil(looseCement % 50);

    // Calculate Sand (Tonne)
    const sandRequired = (quantityOfMortar * ratioNumbers[1] / sumOfRatio) * 1.5;

    // Calculate estimated prices (example rates)
    const brickRate = 8.5; // per brick
    const cementBagRate = 365; // per bag
    const sandRate = 1250; // per tonne
    
    const brickPrice = numberOfBricks * brickRate;
    const cementPrice = (cementBags + (looseCementKg > 0 ? 1 : 0)) * cementBagRate;
    const sandPrice = sandRequired * sandRate;
    const totalPrice = brickPrice + cementPrice + sandPrice;

    setResults({
      bricks: numberOfBricks.toString(),
      cementBags: cementBags.toString(),
      looseCement: looseCement.toFixed(2),
      looseCementBags: looseCementBags.toString(),
      looseCementKg: looseCementKg.toString(),
      sand: sandRequired.toFixed(2),
      brickPrice: brickPrice.toFixed(0),
      cementPrice: cementPrice.toFixed(0),
      sandPrice: sandPrice.toFixed(0),
      totalPrice: totalPrice.toFixed(0)
    });
  };

  const clearAll = () => {
    setWallLength('');
    setWallHeight('');
    setWallThickness('');
    setBrickLength('');
    setBrickWidth('');
    setBrickHeight('');
    setMortarRatio('1:4');
    setResults({ 
      bricks: '', 
      cementBags: '', 
      looseCement: '', 
      looseCementBags: '',
      looseCementKg: '',
      sand: '',
      brickPrice: '',
      cementPrice: '',
      sandPrice: '',
      totalPrice: ''
    });
  };

  const mortarRatios = [
    { value: '1:3', label: 'C.M 1:3' },
    { value: '1:4', label: 'C.M 1:4' },
    { value: '1:5', label: 'C.M 1:5' },
    { value: '1:6', label: 'C.M 1:6' },
    { value: '1:7', label: 'C.M 1:7' },
    { value: '1:8', label: 'C.M 1:8' },
    { value: '1:9', label: 'C.M 1:9' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Brickwork Calculator - Calculate Bricks, Cement & Sand Required
        </h1>
        
        {/* Main Calculator Card */}
        <Card className="mb-6 sm:mb-8 border-2 border-indiamart-teal">
          <CardHeader className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-3">
              🧱 Brickwork Calculator
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height/Depth</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wall Thickness</label>
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ratio</label>
                <Select value={mortarRatio} onValueChange={setMortarRatio}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mortarRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={calculateBrickwork} 
                className="bg-gradient-to-r from-indiamart-teal to-blue-600 hover:from-indiamart-teal/90 hover:to-blue-700 text-white px-8 py-3"
              >
                CALCULATE
              </Button>
              <Button 
                onClick={clearAll} 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
              >
                CLEAR ALL
              </Button>
            </div>

            {/* Results Section */}
            {results.bricks && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Calculation Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🧱</div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Bricks</div>
                        <div className="text-lg font-bold text-indiamart-teal">{results.bricks}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">₹{results.brickPrice}</div>
                      <div className="text-xs text-gray-500">Estimated</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏗️</div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Cement</div>
                        <div className="text-lg font-bold text-blue-600">
                          {results.cementBags} Bag
                          {results.looseCementKg !== '0' && (
                            <div className="text-sm text-orange-600">
                              + {results.looseCementBags} Bag, {results.looseCementKg} Kg
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">₹{results.cementPrice}</div>
                      <div className="text-xs text-gray-500">Estimated</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⛰️</div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Sand</div>
                        <div className="text-lg font-bold text-green-600">{results.sand} ton</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">₹{results.sandPrice}</div>
                      <div className="text-xs text-gray-500">Estimated</div>
                    </div>
                  </div>
                </div>
                
                {/* Total Estimated Price Section */}
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">Total Estimated Price</div>
                    <div className="text-2xl font-bold text-green-600 mt-2">₹{results.totalPrice}</div>
                    <div className="text-xs text-gray-500 mt-1">*Prices are approximate and may vary by location</div>
                  </div>
                </div>
                
                {/* Get Best Price CTA */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <BLForm productType="brick">
                    <Button className="w-full bg-indiamart-teal hover:bg-indiamart-teal-dark text-white py-3 rounded-lg font-medium">
                      Get Best Price
                    </Button>
                  </BLForm>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Categories */}
        <ExploreRelatedCategories />

        {/* Brick Buying Guide */}
        <Card className="mt-6 sm:mt-8 border-2 border-indiamart-teal">
          <CardHeader className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              🧱 Brick Buying Guide
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Different types of bricks used by home and road construction companies
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white">
                        <th className="border border-gray-300 p-3 text-left font-semibold">Type</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Description</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Common Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-red-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-red-600">Red Clay Bricks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Made from natural clay, traditional sun-baked or fired
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Walls, internal partitions
                        </td>
                      </tr>
                      
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-gray-600">Fly Ash Bricks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Made from fly ash (byproduct of thermal plants)
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Eco-friendly, load-bearing
                        </td>
                      </tr>
                      
                      <tr className="bg-blue-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-blue-600">Concrete Bricks/Blocks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Cement, stone dust mix
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Commercial, RCC frames
                        </td>
                      </tr>
                      
                      <tr className="bg-green-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-green-600">AAC Blocks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Lightweight aerated blocks
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          High-rise buildings
                        </td>
                      </tr>
                      
                      <tr className="bg-yellow-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-yellow-600">Wire-Cut Bricks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Machine-made, smooth finish
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Facades, exposed walls
                        </td>
                      </tr>
                      
                      <tr className="bg-orange-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-orange-600">Fire Bricks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          High heat resistance
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Chimneys, furnaces
                        </td>
                      </tr>
                      
                      <tr className="bg-purple-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-purple-600">Hollow Bricks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Less weight, better insulation
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Partition walls
                        </td>
                      </tr>
                      
                      <tr className="bg-pink-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-pink-600">Designer Bricks</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Decorative bricks
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Landscaping, front elevations
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Quality Parameters and Checks for Different Brick Types
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden text-xs">
                    <thead>
                      <tr className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white">
                        <th className="border border-gray-300 p-2 text-left font-semibold">Quality Parameter</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Red Clay Bricks</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Fly Ash Bricks</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">AAC Blocks</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Concrete Bricks/Blocks</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Hollow Clay Bricks</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Wire-Cut Bricks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-2 font-semibold">Shape & Size</td>
                        <td className="border border-gray-300 p-2">Uniform, sharp edges</td>
                        <td className="border border-gray-300 p-2">Machine-made, accurate</td>
                        <td className="border border-gray-300 p-2">Factory-cut, precise</td>
                        <td className="border border-gray-300 p-2">Very precise</td>
                        <td className="border border-gray-300 p-2">Uniform, defined holes</td>
                        <td className="border border-gray-300 p-2">Precise, sharp edges</td>
                      </tr>
                      
                      <tr className="bg-blue-50">
                        <td className="border border-gray-300 p-2 font-semibold">Color</td>
                        <td className="border border-gray-300 p-2">Deep red, uniform</td>
                        <td className="border border-gray-300 p-2">Light grey, consistent</td>
                        <td className="border border-gray-300 p-2">Light grey/white</td>
                        <td className="border border-gray-300 p-2">Uniform grey</td>
                        <td className="border border-gray-300 p-2">Red/orange</td>
                        <td className="border border-gray-300 p-2">Deep red or as per clay</td>
                      </tr>
                      
                      <tr className="bg-green-50">
                        <td className="border border-gray-300 p-2 font-semibold">Surface Finish</td>
                        <td className="border border-gray-300 p-2">Smooth, no lumps</td>
                        <td className="border border-gray-300 p-2">Smooth, even</td>
                        <td className="border border-gray-300 p-2">Smooth, porous</td>
                        <td className="border border-gray-300 p-2">Crack-free, clean</td>
                        <td className="border border-gray-300 p-2">Smooth surface</td>
                        <td className="border border-gray-300 p-2">Highly uniform</td>
                      </tr>
                      
                      <tr className="bg-yellow-50">
                        <td className="border border-gray-300 p-2 font-semibold">Sound Test</td>
                        <td className="border border-gray-300 p-2">Metallic ring</td>
                        <td className="border border-gray-300 p-2">Dull but solid</td>
                        <td className="border border-gray-300 p-2">Dull</td>
                        <td className="border border-gray-300 p-2">Dull but firm</td>
                        <td className="border border-gray-300 p-2">Dull but solid</td>
                        <td className="border border-gray-300 p-2">Metallic ring</td>
                      </tr>
                      
                      <tr className="bg-orange-50">
                        <td className="border border-gray-300 p-2 font-semibold">Drop Test (1m)</td>
                        <td className="border border-gray-300 p-2">Should not break</td>
                        <td className="border border-gray-300 p-2">Should not chip</td>
                        <td className="border border-gray-300 p-2">May chip slightly</td>
                        <td className="border border-gray-300 p-2">Should resist cracking</td>
                        <td className="border border-gray-300 p-2">Should resist damage</td>
                        <td className="border border-gray-300 p-2">Should not break</td>
                      </tr>
                      
                      <tr className="bg-purple-50">
                        <td className="border border-gray-300 p-2 font-semibold">Water Absorption</td>
                        <td className="border border-gray-300 p-2">&lt;20%</td>
                        <td className="border border-gray-300 p-2">&lt;12%</td>
                        <td className="border border-gray-300 p-2">≤10–15%</td>
                        <td className="border border-gray-300 p-2">&lt;10%</td>
                        <td className="border border-gray-300 p-2">&lt;20%</td>
                        <td className="border border-gray-300 p-2">10–15%</td>
                      </tr>
                      
                      <tr className="bg-pink-50">
                        <td className="border border-gray-300 p-2 font-semibold">Compressive Strength</td>
                        <td className="border border-gray-300 p-2">≥3.5 N/mm² (avg 7)</td>
                        <td className="border border-gray-300 p-2">≥7.5 N/mm²</td>
                        <td className="border border-gray-300 p-2">≥3–4 N/mm²</td>
                        <td className="border border-gray-300 p-2">≥5–7.5 N/mm²</td>
                        <td className="border border-gray-300 p-2">≥3.5–7 N/mm²</td>
                        <td className="border border-gray-300 p-2">≥7 N/mm²</td>
                      </tr>
                      
                      <tr className="bg-indigo-50">
                        <td className="border border-gray-300 p-2 font-semibold">Efflorescence</td>
                        <td className="border border-gray-300 p-2">None to slight</td>
                        <td className="border border-gray-300 p-2">None to very slight</td>
                        <td className="border border-gray-300 p-2">None</td>
                        <td className="border border-gray-300 p-2">None</td>
                        <td className="border border-gray-300 p-2">Minimal</td>
                        <td className="border border-gray-300 p-2">None</td>
                      </tr>
                      
                      <tr className="bg-teal-50">
                        <td className="border border-gray-300 p-2 font-semibold">Density</td>
                        <td className="border border-gray-300 p-2">~1800 kg/m³</td>
                        <td className="border border-gray-300 p-2">~1800–2000 kg/m³</td>
                        <td className="border border-gray-300 p-2">500–700 kg/m³</td>
                        <td className="border border-gray-300 p-2">1800–2200 kg/m³</td>
                        <td className="border border-gray-300 p-2">~1500–1800 kg/m³</td>
                        <td className="border border-gray-300 p-2">Similar to clay brick</td>
                      </tr>
                      
                      <tr className="bg-cyan-50">
                        <td className="border border-gray-300 p-2 font-semibold">Thermal Insulation</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                        <td className="border border-gray-300 p-2">High</td>
                        <td className="border border-gray-300 p-2">Low to moderate</td>
                        <td className="border border-gray-300 p-2">High</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                      </tr>
                      
                      <tr className="bg-emerald-50">
                        <td className="border border-gray-300 p-2 font-semibold">Weight</td>
                        <td className="border border-gray-300 p-2">Medium</td>
                        <td className="border border-gray-300 p-2">Medium</td>
                        <td className="border border-gray-300 p-2">Light</td>
                        <td className="border border-gray-300 p-2">Heavy</td>
                        <td className="border border-gray-300 p-2">Light</td>
                        <td className="border border-gray-300 p-2">Medium</td>
                      </tr>
                      
                      <tr className="bg-lime-50">
                        <td className="border border-gray-300 p-2 font-semibold">Crack Resistance</td>
                        <td className="border border-gray-300 p-2">Good</td>
                        <td className="border border-gray-300 p-2">Excellent</td>
                        <td className="border border-gray-300 p-2">Good</td>
                        <td className="border border-gray-300 p-2">Excellent</td>
                        <td className="border border-gray-300 p-2">Fair</td>
                        <td className="border border-gray-300 p-2">Excellent</td>
                      </tr>
                      
                      <tr className="bg-amber-50">
                        <td className="border border-gray-300 p-2 font-semibold">Eco-Friendliness</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                        <td className="border border-gray-300 p-2">High (byproduct use)</td>
                        <td className="border border-gray-300 p-2">High (low energy)</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                        <td className="border border-gray-300 p-2">Moderate</td>
                      </tr>
                      
                      <tr className="bg-rose-50">
                        <td className="border border-gray-300 p-2 font-semibold">IS Code Compliance</td>
                        <td className="border border-gray-300 p-2">IS 1077</td>
                        <td className="border border-gray-300 p-2">IS 12894</td>
                        <td className="border border-gray-300 p-2">IS 2185 (Part 3)</td>
                        <td className="border border-gray-300 p-2">IS 2185 (Part 1)</td>
                        <td className="border border-gray-300 p-2">IS 3952</td>
                        <td className="border border-gray-300 p-2">IS 1077</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrickworkCalculator;
