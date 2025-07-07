
import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, RotateCcw } from 'lucide-react';

const CementCalculator = () => {
  const [activeTab, setActiveTab] = useState('brickwork');
  
  // Brickwork states
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
  
  // Concrete states
  const [concreteGrade, setConcreteGrade] = useState('M20 (1:1.5:3)');
  const [concreteLengthFeet, setConcreteLengthFeet] = useState('10');
  const [concreteLengthInch, setConcreteLengthInch] = useState('0');
  const [concreteLengthUnit, setConcreteLengthUnit] = useState('meter');
  const [concreteLengthInchUnit, setConcreteLengthInchUnit] = useState('cm');
  const [concreteWidthFeet, setConcreteWidthFeet] = useState('7');
  const [concreteWidthInch, setConcreteWidthInch] = useState('0');
  const [concreteWidthUnit, setConcreteWidthUnit] = useState('meter');
  const [concreteWidthInchUnit, setConcreteWidthInchUnit] = useState('cm');
  const [concreteDepthFeet, setConcreteDepthFeet] = useState('4');
  const [concreteDepthInch, setConcreteDepthInch] = useState('0');
  const [concreteDepthUnit, setConcreteDepthUnit] = useState('meter');
  const [concreteDepthInchUnit, setConcreteDepthInchUnit] = useState('cm');
  
  // Plaster states
  const [plasterType, setPlasterType] = useState('12 MM');
  const [plasterLengthFeet, setPlasterLengthFeet] = useState('10');
  const [plasterLengthInch, setPlasterLengthInch] = useState('0');
  const [plasterLengthUnit, setPlasterLengthUnit] = useState('meter');
  const [plasterLengthInchUnit, setPlasterLengthInchUnit] = useState('cm');
  const [plasterWidthFeet, setPlasterWidthFeet] = useState('10');
  const [plasterWidthInch, setPlasterWidthInch] = useState('0');
  const [plasterWidthUnit, setPlasterWidthUnit] = useState('meter');
  const [plasterWidthInchUnit, setPlasterWidthInchUnit] = useState('cm');
  const [gradeOfFooting, setGradeOfFooting] = useState('C.M(1:3)');
  
  // Unit states
  const [lengthUnit, setLengthUnit] = useState('feet');
  const [inchUnit, setInchUnit] = useState('inch');
  
  // Result states
  const [result, setResult] = useState(null);
  const [concreteResult, setConcreteResult] = useState(null);
  const [plasterResult, setPlasterResult] = useState(null);

  const convertToMeters = (feet: string, inches: string) => {
    const totalInches = parseFloat(feet || '0') * 12 + parseFloat(inches || '0');
    return totalInches * 0.0254;
  };

  const convertToMetersFromDualUnit = (mainValue: string, mainUnit: string, subValue: string, subUnit: string) => {
    let mainInMeters = 0;
    let subInMeters = 0;
    
    // Convert main value
    const mainNum = parseFloat(mainValue || '0');
    if (mainUnit === 'meter') {
      mainInMeters = mainNum;
    } else if (mainUnit === 'feet') {
      mainInMeters = mainNum * 0.3048;
    }
    
    // Convert sub value
    const subNum = parseFloat(subValue || '0');
    if (subUnit === 'cm') {
      subInMeters = subNum / 100;
    } else if (subUnit === 'inch') {
      subInMeters = subNum * 0.0254;
    }
    
    return mainInMeters + subInMeters;
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

  const calculateConcrete = () => {
    try {
      // Convert dimensions to meters using dual inputs
      const length = convertToMetersFromDualUnit(concreteLengthFeet, concreteLengthUnit, concreteLengthInch, concreteLengthInchUnit);
      const width = convertToMetersFromDualUnit(concreteWidthFeet, concreteWidthUnit, concreteWidthInch, concreteWidthInchUnit);
      const depth = convertToMetersFromDualUnit(concreteDepthFeet, concreteDepthUnit, concreteDepthInch, concreteDepthInchUnit);
      
      // Calculate Cement Concrete Volume
      const cementConcreteVolume = length * width * depth;
      
      // Calculate Wet Volume of Mix
      const wetVolumeOfMix = cementConcreteVolume * 1.524;
      
      // Extract ratios from grade
      const ratioString = concreteGrade.split('(')[1].split(')')[0];
      const ratioNumbers = ratioString.split(':').map(num => parseFloat(num));
      const sumOfRatios = ratioNumbers.reduce((sum, num) => sum + num, 0);
      
      // Calculate Cement Volume
      const cementVolume = wetVolumeOfMix * (ratioNumbers[0] / sumOfRatios);
      
      // Calculate number of cement bags
      const totalCementBags = cementVolume / 0.035;
      const cementBags = Math.floor(totalCementBags);
      const excessCement = Math.floor((totalCementBags - cementBags) * 50);
      
      // Calculate Sand Volume and Required
      const sandVolume = wetVolumeOfMix * (ratioNumbers[1] / sumOfRatios);
      const sandRequired = sandVolume * 1.55;
      
      // Calculate Aggregate Volume and Required
      const aggregateVolume = wetVolumeOfMix * (ratioNumbers[2] / sumOfRatios);
      const aggregateRequired = aggregateVolume * 1.35;
      
      setConcreteResult({
        cementBags,
        excessCement,
        sandRequired: sandRequired.toFixed(2),
        aggregateRequired: aggregateRequired.toFixed(2)
      });
    } catch (error) {
      console.error('Concrete calculation error:', error);
    }
  };

  const calculatePlaster = () => {
    try {
      // Convert dimensions to meters using dual inputs
      const length = convertToMetersFromDualUnit(plasterLengthFeet, plasterLengthUnit, plasterLengthInch, plasterLengthInchUnit);
      const width = convertToMetersFromDualUnit(plasterWidthFeet, plasterWidthUnit, plasterWidthInch, plasterWidthInchUnit);
      
      // Get depth/thickness from plaster type
      let depth;
      switch (plasterType) {
        case '12 MM':
          depth = 0.012; // 12mm in meters
          break;
        case '15 MM':
          depth = 0.015; // 15mm in meters
          break;
        case '20 MM':
          depth = 0.020; // 20mm in meters
          break;
        default:
          depth = 0.012;
      }
      
      // Calculate Plaster Volume
      const plasterVolume = length * width * depth;
      
      // Calculate Dry Volume of Plaster
      const dryVolumeOfPlaster = plasterVolume * 1.3 * 1.25;
      
      // Extract ratios from grade
      const ratioString = gradeOfFooting.split('(')[1].split(')')[0];
      const ratioNumbers = ratioString.split(':').map(num => parseFloat(num));
      const sumOfRatios = ratioNumbers.reduce((sum, num) => sum + num, 0);
      
      // Calculate Cement Volume
      const cementVolume = dryVolumeOfPlaster * (ratioNumbers[0] / sumOfRatios);
      
      // Calculate number of cement bags
      const totalCementBags = cementVolume / 0.035;
      const cementBags = Math.floor(totalCementBags);
      const excessCement = Math.floor((totalCementBags - cementBags) * 50);
      
      // Calculate Sand Volume and Required
      const sandVolume = dryVolumeOfPlaster * (ratioNumbers[1] / sumOfRatios);
      const sandRequired = sandVolume * 1.55;
      
      setPlasterResult({
        cementBags,
        excessCement,
        sandRequired: sandRequired.toFixed(2)
      });
    } catch (error) {
      console.error('Plaster calculation error:', error);
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

  const resetConcreteForm = () => {
    setConcreteGrade('M20 (1:1.5:3)');
    setConcreteLengthFeet('10');
    setConcreteLengthInch('0');
    setConcreteWidthFeet('7');
    setConcreteWidthInch('0');
    setConcreteDepthFeet('4');
    setConcreteDepthInch('0');
    setConcreteLengthUnit('meter');
    setConcreteLengthInchUnit('cm');
    setConcreteWidthUnit('meter');
    setConcreteWidthInchUnit('cm');
    setConcreteDepthUnit('meter');
    setConcreteDepthInchUnit('cm');
    setConcreteResult(null);
  };

  const resetPlasterForm = () => {
    setPlasterType('12 MM');
    setPlasterLengthFeet('10');
    setPlasterLengthInch('0');
    setPlasterWidthFeet('10');
    setPlasterWidthInch('0');
    setPlasterLengthUnit('meter');
    setPlasterLengthInchUnit('cm');
    setPlasterWidthUnit('meter');
    setPlasterWidthInchUnit('cm');
    setGradeOfFooting('C.M(1:3)');
    setPlasterResult(null);
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
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-12 sm:h-15 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-lg">
              <TabsTrigger 
                value="brickwork" 
                className="text-lg sm:text-xl font-black py-3 px-2 h-full flex items-center justify-center text-center leading-tight 
                          transition-all duration-300 rounded-lg mx-1 my-1 font-sans
                          data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 
                          data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-[0.98]
                          data-[state=inactive]:text-blue-800 data-[state=inactive]:hover:bg-blue-100 data-[state=inactive]:hover:scale-[0.99]
                          data-[state=inactive]:bg-white/80 data-[state=inactive]:border-2 data-[state=inactive]:border-blue-300
                          data-[state=inactive]:shadow-md transform hover:shadow-lg"
              >
                Brickwork
              </TabsTrigger>
              <TabsTrigger 
                value="concrete" 
                className="text-lg sm:text-xl font-black py-3 px-2 h-full flex items-center justify-center text-center leading-tight
                          transition-all duration-300 rounded-lg mx-1 my-1 font-sans
                          data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 
                          data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-[0.98]
                          data-[state=inactive]:text-blue-800 data-[state=inactive]:hover:bg-blue-100 data-[state=inactive]:hover:scale-[0.99]
                          data-[state=inactive]:bg-white/80 data-[state=inactive]:border-2 data-[state=inactive]:border-blue-300
                          data-[state=inactive]:shadow-md transform hover:shadow-lg"
              >
                Concrete
              </TabsTrigger>
              <TabsTrigger 
                value="plaster" 
                className="text-lg sm:text-xl font-black py-3 px-2 h-full flex items-center justify-center text-center leading-tight
                          transition-all duration-300 rounded-lg mx-1 my-1 font-sans
                          data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 
                          data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-[0.98]
                          data-[state=inactive]:text-blue-800 data-[state=inactive]:hover:bg-blue-100 data-[state=inactive]:hover:scale-[0.99]
                          data-[state=inactive]:bg-white/80 data-[state=inactive]:border-2 data-[state=inactive]:border-blue-300
                          data-[state=inactive]:shadow-md transform hover:shadow-lg"
              >
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
                        Length
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
                        Height / Depth
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
                        Wall Thickness
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
                        Ratio
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
                        Size of Brick
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
                        <div className="flex justify-between items-center border-2 border-emerald-500 bg-emerald-200 p-3 rounded-lg shadow-sm">
                          <span className="text-emerald-900 font-bold">Cement Required:</span>
                          <span className="font-bold text-lg text-emerald-900">
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
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-gray-800">
                    <Calculator className="w-5 h-5" />
                    Concrete Cement Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-3 sm:p-6">
                  {/* Grade of Concrete */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Grade of Concrete
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <Select value={concreteGrade} onValueChange={setConcreteGrade}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="M25 (1:1:2)">M25 (1:1:2)</SelectItem>
                            <SelectItem value="M20 (1:1.5:3)">M20 (1:1.5:3)</SelectItem>
                            <SelectItem value="M15 (1:2:4)">M15 (1:2:4)</SelectItem>
                            <SelectItem value="M10 (1:3:6)">M10 (1:3:6)</SelectItem>
                            <SelectItem value="M7.5 (1:4:8)">M7.5 (1:4:8)</SelectItem>
                            <SelectItem value="M5 (1:5:10)">M5 (1:5:10)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Length Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Length
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={concreteLengthFeet}
                          onChange={(e) => setConcreteLengthFeet(e.target.value)}
                          placeholder="10"
                          className="text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={concreteLengthUnit} onValueChange={setConcreteLengthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="meter">meter</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={concreteLengthInch}
                          onChange={(e) => setConcreteLengthInch(e.target.value)}
                          placeholder="0"
                          className="text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={concreteLengthInchUnit} onValueChange={setConcreteLengthInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="inch">inch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Width Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Width
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={concreteWidthFeet}
                          onChange={(e) => setConcreteWidthFeet(e.target.value)}
                          placeholder="7"
                          className="text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={concreteWidthUnit} onValueChange={setConcreteWidthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="meter">meter</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={concreteWidthInch}
                          onChange={(e) => setConcreteWidthInch(e.target.value)}
                          placeholder="0"
                          className="text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={concreteWidthInchUnit} onValueChange={setConcreteWidthInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="inch">inch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Depth Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Depth
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={concreteDepthFeet}
                          onChange={(e) => setConcreteDepthFeet(e.target.value)}
                          placeholder="4"
                          className="text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={concreteDepthUnit} onValueChange={setConcreteDepthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="meter">meter</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={concreteDepthInch}
                          onChange={(e) => setConcreteDepthInch(e.target.value)}
                          placeholder="0"
                          className="text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={concreteDepthInchUnit} onValueChange={setConcreteDepthInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="inch">inch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 sm:gap-4 justify-center pt-4">
                    <Button onClick={calculateConcrete} className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={resetConcreteForm} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-4 sm:px-6">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>

                  {/* Concrete Results */}
                  {concreteResult && (
                    <div className="mt-6 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">Concrete Calculator Results</h3>
                      <div className="space-y-3 text-sm">
                        {/* Highlighted Cement Required Row */}
                        <div className="flex justify-between items-center border-2 border-blue-500 bg-blue-200 p-3 rounded-lg shadow-sm">
                          <span className="text-blue-900 font-bold">Cement Bags Required:</span>
                          <span className="font-bold text-lg text-blue-900">
                            {concreteResult.cementBags} Bags{concreteResult.excessCement > 0 ? `, ${concreteResult.excessCement} Kg` : ''}
                          </span>
                        </div>
                        
                        {/* Sand Required */}
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-gray-700 font-semibold">Sand Required:</span>
                          <span className="font-bold text-lg text-blue-700">{concreteResult.sandRequired} Tonne</span>
                        </div>
                        
                        {/* Aggregate Required */}
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-gray-700 font-semibold">Aggregate Required:</span>
                          <span className="font-bold text-lg text-blue-700">{concreteResult.aggregateRequired} Tonne</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plaster">
              <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-gray-800">
                    <Calculator className="w-5 h-5" />
                    Plaster Cement Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-3 sm:p-6">
                  {/* Plaster Type */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Plaster Type
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <Select value={plasterType} onValueChange={setPlasterType}>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="12 MM">12 MM</SelectItem>
                            <SelectItem value="15 MM">15 MM</SelectItem>
                            <SelectItem value="20 MM">20 MM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Length Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Length
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={plasterLengthFeet}
                          onChange={(e) => setPlasterLengthFeet(e.target.value)}
                          placeholder="10"
                          className="text-center border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={plasterLengthUnit} onValueChange={setPlasterLengthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="meter">meter</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={plasterLengthInch}
                          onChange={(e) => setPlasterLengthInch(e.target.value)}
                          placeholder="0"
                          className="text-center border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={plasterLengthInchUnit} onValueChange={setPlasterLengthInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="inch">inch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Width Input */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Width
                      </label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                      <div>
                        <Input
                          type="number"
                          value={plasterWidthFeet}
                          onChange={(e) => setPlasterWidthFeet(e.target.value)}
                          placeholder="10"
                          className="text-center border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={plasterWidthUnit} onValueChange={setPlasterWidthUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="meter">meter</SelectItem>
                            <SelectItem value="feet">feet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={plasterWidthInch}
                          onChange={(e) => setPlasterWidthInch(e.target.value)}
                          placeholder="0"
                          className="text-center border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9"
                        />
                      </div>
                      <div>
                        <Select value={plasterWidthInchUnit} onValueChange={setPlasterWidthInchUnit}>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="cm">cm</SelectItem>
                            <SelectItem value="inch">inch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Grade of footing */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Grade of footing
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <Select value={gradeOfFooting} onValueChange={setGradeOfFooting}>
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="C.M(1:3)">C.M(1:3)</SelectItem>
                            <SelectItem value="C.M(1:4)">C.M(1:4)</SelectItem>
                            <SelectItem value="C.M(1:5)">C.M(1:5)</SelectItem>
                            <SelectItem value="C.M(1:6)">C.M(1:6)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 sm:gap-4 justify-center pt-4">
                    <Button onClick={calculatePlaster} className="bg-purple-500 hover:bg-purple-600 text-white px-4 sm:px-6">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate
                    </Button>
                    <Button onClick={resetPlasterForm} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 px-4 sm:px-6">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>

                  {/* Plaster Results */}
                  {plasterResult && (
                    <div className="mt-6 p-4 sm:p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-semibold text-purple-800 mb-4">Plaster Calculator Results</h3>
                      <div className="space-y-3 text-sm">
                        {/* Highlighted Cement Required Row */}
                        <div className="flex justify-between items-center border-2 border-purple-500 bg-purple-200 p-3 rounded-lg shadow-sm">
                          <span className="text-purple-900 font-bold">Cement Bags Required:</span>
                          <span className="font-bold text-lg text-purple-900">
                            {plasterResult.cementBags} Bags{plasterResult.excessCement > 0 ? `, ${plasterResult.excessCement} Kg` : ''}
                          </span>
                        </div>
                        
                        {/* Sand Required */}
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-gray-700 font-semibold">Sand Required:</span>
                          <span className="font-bold text-lg text-purple-700">{plasterResult.sandRequired} Tonne</span>
                        </div>
                      </div>
                    </div>
                  )}
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
