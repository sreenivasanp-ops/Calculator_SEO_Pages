import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, RotateCcw, Info } from 'lucide-react';

const CementCalculator = () => {
  const [activeTab, setActiveTab] = useState('brickwork');
  
  // Input states
  const [lengthFeet, setLengthFeet] = useState('3');
  const [lengthInch, setLengthInch] = useState('6');
  const [heightFeet, setHeightFeet] = useState('3');
  const [heightInch, setHeightInch] = useState('6');
  const [wallThickness, setWallThickness] = useState('23');
  const [customThickness, setCustomThickness] = useState('');
  const [mortarRatio, setMortarRatio] = useState('1:6');
  const [brickLength, setBrickLength] = useState('23');
  const [brickWidth, setBrickWidth] = useState('11.5');
  const [brickHeight, setBrickHeight] = useState('7.5');
  
  // Unit states
  const [lengthUnit, setLengthUnit] = useState('feet');
  const [inchUnit, setInchUnit] = useState('inch');
  
  // Result state
  const [result, setResult] = useState(null);

  const convertToMeters = (feet: string, inches: string) => {
    const totalInches = parseFloat(feet || '0') * 12 + parseFloat(inches || '0');
    return totalInches * 0.0254;
  };

  const calculateCement = () => {
    try {
      // Convert dimensions to meters
      const length = lengthUnit === 'feet' ? convertToMeters(lengthFeet, lengthInch) : parseFloat(lengthFeet || '0');
      const height = lengthUnit === 'feet' ? convertToMeters(heightFeet, heightInch) : parseFloat(heightFeet || '0');
      const thickness = (parseFloat(wallThickness === 'others' ? customThickness : wallThickness) || 0) / 100; // Convert cm to m
      
      // 1) Calculate Volume of Brick Masonry
      const volumeBrickMasonry = length * height * thickness;
      
      // 2) Calculate Number of Bricks
      // Convert brick dimensions with 1cm added to meters
      const brickLengthWithMortar = (parseFloat(brickLength || '0') + 1) / 100; // Add 1cm and convert to meters
      const brickWidthWithMortar = (parseFloat(brickWidth || '0') + 1) / 100;
      const brickHeightWithMortar = (parseFloat(brickHeight || '0') + 1) / 100;
      
      const volumeBrickMortar = brickLengthWithMortar * brickWidthWithMortar * brickHeightWithMortar;
      const numberOfBricks = Math.floor(volumeBrickMasonry / volumeBrickMortar);
      
      // 3) Calculate Quantity of Mortar
      // Actual Volume of Bricks (without mortar addition)
      const actualBrickLength = parseFloat(brickLength || '0') / 100; // Convert to meters
      const actualBrickWidth = parseFloat(brickWidth || '0') / 100;
      const actualBrickHeight = parseFloat(brickHeight || '0') / 100;
      
      const actualVolumeBricks = numberOfBricks * actualBrickLength * actualBrickWidth * actualBrickHeight;
      
      // Quantity of Mortar with Dry Volume Calculator (1.25)
      const quantityMortar = (volumeBrickMasonry - actualVolumeBricks) * 1.15 * 1.25;
      
      // Calculate Volume of Cement
      const ratioNumbers = mortarRatio.split(':').map(num => parseFloat(num));
      const denominator = ratioNumbers[1]; // Sand ratio
      const volumeCement = quantityMortar / (denominator + 1);
      
      // Calculate number of cement bags
      const totalCementBags = volumeCement / 0.035;
      const cementBags = Math.floor(totalCementBags);
      const excessCement = Math.floor((totalCementBags - cementBags) * 50); // Convert remainder to kg without decimals
      
      // Calculate Sand Required
      const sandRequired = (quantityMortar * (denominator / (denominator + 1))) * 1.5;
      
      setResult({
        volumeBrickMasonry: volumeBrickMasonry.toFixed(4),
        numberOfBricks,
        quantityMortar: quantityMortar.toFixed(4),
        volumeCement: volumeCement.toFixed(4),
        actualVolumeBricks: actualVolumeBricks.toFixed(4),
        cementBags,
        excessCement,
        sandRequired: sandRequired.toFixed(2)
      });
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const resetForm = () => {
    setLengthFeet('3');
    setLengthInch('6');
    setHeightFeet('3');
    setHeightInch('6');
    setWallThickness('23');
    setCustomThickness('');
    setMortarRatio('1:6');
    setBrickLength('23');
    setBrickWidth('11.5');
    setBrickHeight('7.5');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 text-center">
            Cement Calculator for Wall, Plaster & Concrete
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-20">
              <TabsTrigger value="brickwork" className="text-xs sm:text-sm py-4 px-2 h-full flex items-center justify-center text-center leading-tight">
                Brickwork
              </TabsTrigger>
              <TabsTrigger value="concrete" className="text-xs sm:text-sm py-4 px-2 h-full flex items-center justify-center text-center leading-tight">
                Concrete
              </TabsTrigger>
              <TabsTrigger value="plaster" className="text-xs sm:text-sm py-4 px-2 h-full flex items-center justify-center text-center leading-tight">
                Plaster
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="brickwork">
              <Card className="border-2 border-teal-200">
                <CardHeader className="bg-teal-50 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-gray-800">
                    <Calculator className="w-5 h-5" />
                    Brickwork Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-3 sm:p-6">
                  {/* Length Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Length <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={lengthFeet}
                          onChange={(e) => setLengthFeet(e.target.value)}
                          placeholder="3"
                          className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={lengthUnit} onValueChange={setLengthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="feet">feet</SelectItem>
                            <SelectItem value="m">meter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={lengthInch}
                          onChange={(e) => setLengthInch(e.target.value)}
                          placeholder="6"
                          className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={inchUnit} onValueChange={setInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="inch">inch</SelectItem>
                            <SelectItem value="cm">cm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Height/Depth Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Height / Depth <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(e.target.value)}
                          placeholder="3"
                          className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={lengthUnit} onValueChange={setLengthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="feet">feet</SelectItem>
                            <SelectItem value="m">meter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={heightInch}
                          onChange={(e) => setHeightInch(e.target.value)}
                          placeholder="6"
                          className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={inchUnit} onValueChange={setInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="inch">inch</SelectItem>
                            <SelectItem value="cm">cm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Wall Thickness */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Wall Thickness <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Select value={wallThickness} onValueChange={setWallThickness}>
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="23">23 cm</SelectItem>
                            <SelectItem value="10">10 cm</SelectItem>
                            <SelectItem value="20">20 cm</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {wallThickness === 'others' && (
                        <div>
                          <Input
                            type="number"
                            value={customThickness}
                            onChange={(e) => setCustomThickness(e.target.value)}
                            placeholder="Enter thickness"
                            className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mortar Ratio */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Ratio <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Select value={mortarRatio} onValueChange={setMortarRatio}>
                          <SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="1:3">C.M 1:3</SelectItem>
                            <SelectItem value="1:4">C.M 1:4</SelectItem>
                            <SelectItem value="1:5">C.M 1:5</SelectItem>
                            <SelectItem value="1:6">C.M 1:6</SelectItem>
                            <SelectItem value="1:7">C.M 1:7</SelectItem>
                            <SelectItem value="1:8">C.M 1:8</SelectItem>
                            <SelectItem value="1:9">C.M 1:9</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Size of Brick */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Size of Brick <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Length */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Length</div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={brickLength}
                            onChange={(e) => setBrickLength(e.target.value)}
                            placeholder="23"
                            className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                          />
                          <span className="text-sm text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      {/* Width */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Width</div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={brickWidth}
                            onChange={(e) => setBrickWidth(e.target.value)}
                            placeholder="11.5"
                            className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                          />
                          <span className="text-sm text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      {/* Height */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-600">Height</div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={brickHeight}
                            onChange={(e) => setBrickHeight(e.target.value)}
                            placeholder="7.5"
                            className="text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 h-9"
                          />
                          <span className="text-sm text-gray-500">cm</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 sm:gap-4 justify-center pt-4">
                    <Button onClick={calculateCement} className="bg-teal-500 hover:bg-teal-600 text-white px-4 sm:px-6">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={resetForm} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-4 sm:px-6">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>

                  {/* Results */}
                  {result && (
                    <div className="mt-6 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">Cement Calculator</h3>
                      <div className="space-y-3 text-sm">
                        {/* Highlighted Cement Required Row */}
                        <div className="flex justify-between items-center border-2 border-green-500 bg-green-100 p-3 rounded-lg">
                          <span className="text-green-800 font-bold">Cement Required:</span>
                          <span className="font-bold text-lg text-green-800">
                            {result.cementBags} Bags{result.excessCement > 0 ? `, ${result.excessCement} Kg` : ''}
                          </span>
                        </div>
                        
                        {/* Number of Bricks */}
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-gray-700 font-semibold">Number of Bricks:</span>
                          <span className="font-bold text-lg text-green-700">{result.numberOfBricks} Bricks</span>
                        </div>
                        
                        {/* Sand Required */}
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-gray-700 font-semibold">Sand Required:</span>
                          <span className="font-bold text-lg text-green-700">{result.sandRequired} Tonne</span>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-2">
                          * Calculation includes 15% wastage factor and 25% dry volume factor
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="concrete">
              <Card className="border-2 border-teal-200">
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <p>Concrete calculator coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plaster">
              <Card className="border-2 border-teal-200">
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <p>Plaster calculator coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CementCalculator;
