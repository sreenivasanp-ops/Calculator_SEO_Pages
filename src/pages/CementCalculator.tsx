
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

  const convertToMeters = (feet, inches) => {
    const totalInches = parseFloat(feet || 0) * 12 + parseFloat(inches || 0);
    return totalInches * 0.0254;
  };

  const convertToCm = (value, unit) => {
    if (unit === 'feet') return parseFloat(value || 0) * 30.48;
    if (unit === 'inch') return parseFloat(value || 0) * 2.54;
    if (unit === 'm') return parseFloat(value || 0) * 100;
    return parseFloat(value || 0);
  };

  const calculateCement = () => {
    try {
      // Convert dimensions to meters
      const length = lengthUnit === 'feet' ? convertToMeters(lengthFeet, lengthInch) : parseFloat(lengthFeet || 0);
      const height = lengthUnit === 'feet' ? convertToMeters(heightFeet, heightInch) : parseFloat(heightFeet || 0);
      const thickness = (parseFloat(wallThickness === 'others' ? customThickness : wallThickness) || 0) / 100; // Convert cm to m
      
      // Calculate volume of brick masonry
      const volumeBrickMasonry = length * height * thickness;
      
      // Convert brick dimensions to meters
      const brickL = parseFloat(brickLength || 0) / 100;
      const brickW = parseFloat(brickWidth || 0) / 100;
      const brickH = parseFloat(brickHeight || 0) / 100;
      
      // Volume of one brick
      const volumeOneBrick = brickL * brickW * brickH;
      
      // Number of bricks
      const numberOfBricks = Math.ceil(volumeBrickMasonry / volumeOneBrick);
      
      // Size of brick with mortar (adding 1cm mortar on each side)
      const brickWithMortarL = brickL + 0.01;
      const brickWithMortarW = brickW + 0.01;
      const brickWithMortarH = brickH + 0.01;
      
      const volumeBrickWithMortar = brickWithMortarL * brickWithMortarW * brickWithMortarH;
      
      // Actual volume of bricks
      const actualVolumeBricks = numberOfBricks * volumeOneBrick;
      
      // Volume of mortar
      const volumeMortar = volumeBrickMasonry - actualVolumeBricks;
      
      // Calculate cement quantity based on mortar ratio
      const ratioNumbers = mortarRatio.split(':').map(num => parseFloat(num));
      const cementRatio = ratioNumbers[0];
      const sandRatio = ratioNumbers[1];
      const totalRatio = cementRatio + sandRatio;
      
      // Cement volume
      const cementVolume = (cementRatio / totalRatio) * volumeMortar;
      
      // Add 15% for wastage
      const cementVolumeWithWastage = cementVolume * 1.15;
      
      // Add 25% for dry volume
      const finalCementVolume = cementVolumeWithWastage * 1.25;
      
      // Convert to bags (1 bag = 0.035 m³)
      const cementBags = Math.ceil(finalCementVolume / 0.035);
      
      setResult({
        volumeBrickMasonry: volumeBrickMasonry.toFixed(4),
        numberOfBricks,
        volumeMortar: volumeMortar.toFixed(4),
        cementVolume: finalCementVolume.toFixed(4),
        cementBags
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
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Cement Calculator for Wall, Plaster & Concrete
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="brickwork">Material Calculator for Brickwork</TabsTrigger>
              <TabsTrigger value="concrete">Material Calculator for Concrete</TabsTrigger>
              <TabsTrigger value="plaster">Material Calculator for Plaster</TabsTrigger>
            </TabsList>
            
            <TabsContent value="brickwork">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Brickwork Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Length Input */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={lengthFeet}
                        onChange={(e) => setLengthFeet(e.target.value)}
                        placeholder="3"
                      />
                    </div>
                    <div>
                      <Select value={lengthUnit} onValueChange={setLengthUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                      />
                    </div>
                    <div>
                      <Select value={inchUnit} onValueChange={setInchUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inch">inch</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Height/Depth Input */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height / Depth <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="3"
                      />
                    </div>
                    <div>
                      <Select value={lengthUnit} onValueChange={setLengthUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                      />
                    </div>
                    <div>
                      <Select value={inchUnit} onValueChange={setInchUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inch">inch</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Wall Thickness */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wall Thickness <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div>
                      <Select value={wallThickness} onValueChange={setWallThickness}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                        />
                      </div>
                    )}
                  </div>

                  {/* Mortar Ratio */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ratio <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div>
                      <Select value={mortarRatio} onValueChange={setMortarRatio}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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

                  {/* Size of Brick */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Size of Brick <Info className="inline w-4 h-4 ml-1" />
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="text-sm font-medium">Length</div>
                      <div className="text-sm font-medium">Width</div>
                      <div className="text-sm font-medium">Height</div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div>
                        <Input
                          type="number"
                          value={brickLength}
                          onChange={(e) => setBrickLength(e.target.value)}
                          placeholder="23"
                        />
                      </div>
                      <div className="text-sm text-gray-500">cm</div>
                      <div>
                        <Input
                          type="number"
                          value={brickWidth}
                          onChange={(e) => setBrickWidth(e.target.value)}
                          placeholder="11.5"
                        />
                      </div>
                      <div className="text-sm text-gray-500">cm</div>
                      <div>
                        <Input
                          type="number"
                          value={brickHeight}
                          onChange={(e) => setBrickHeight(e.target.value)}
                          placeholder="7.5"
                        />
                      </div>
                      <div className="text-sm text-gray-500">cm</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-center pt-6">
                    <Button onClick={calculateCement} className="bg-blue-600 hover:bg-blue-700">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={resetForm} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {/* Results */}
                  {result && (
                    <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">Calculation Results</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Volume of Brick Masonry:</span>
                          <span className="font-semibold">{result.volumeBrickMasonry} m³</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Number of Bricks:</span>
                          <span className="font-semibold">{result.numberOfBricks} Bricks</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Volume of Mortar:</span>
                          <span className="font-semibold">{result.volumeMortar} m³</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Total Cement Volume:</span>
                          <span className="font-semibold">{result.cementVolume} m³</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-gray-700 font-semibold">Cement Required:</span>
                          <span className="font-bold text-lg text-green-700">{result.cementBags} Bags</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          * Calculation includes 15% wastage and 25% dry volume
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="concrete">
              <Card>
                <CardContent className="p-8">
                  <div className="text-center text-gray-500">
                    <p>Concrete calculator coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plaster">
              <Card>
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
