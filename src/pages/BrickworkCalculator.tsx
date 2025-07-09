
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import ExploreRelatedCategories from '@/components/ExploreRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    sand: ''
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

    // Calculate Sand (Tonne)
    const sandRequired = (quantityOfMortar * ratioNumbers[1] / sumOfRatio) * 1.5;

    setResults({
      bricks: numberOfBricks.toString(),
      cementBags: cementBags.toString(),
      looseCement: looseCement.toFixed(2),
      sand: sandRequired.toFixed(3)
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
    setResults({ bricks: '', cementBags: '', looseCement: '', sand: '' });
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
                      placeholder="10"
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
                      placeholder="10"
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
                      placeholder="0.75"
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
                      placeholder="23"
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
                      placeholder="11"
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
                      placeholder="7.5"
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
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center gap-3">
                    <div className="text-2xl">🧱</div>
                    <div>
                      <div className="text-2xl font-bold text-indiamart-teal">{results.bricks}</div>
                      <div className="text-sm text-gray-600">Bricks</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center gap-3">
                    <div className="text-2xl">🏗️</div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{results.cementBags} Bag</div>
                      <div className="text-sm text-gray-600">Cement</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center gap-3">
                    <div className="text-2xl">⛰️</div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{results.sand} ton</div>
                      <div className="text-sm text-gray-600">Sand</div>
                    </div>
                  </div>
                </div>
                {results.looseCement !== '0.00' && (
                  <div className="text-center mt-4 p-2 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      Additional loose cement required: <span className="font-bold text-orange-600">{results.looseCement} kg</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Categories */}
        <ExploreRelatedCategories />
      </div>
    </div>
  );
};

export default BrickworkCalculator;
