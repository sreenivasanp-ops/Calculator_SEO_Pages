
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import ExploreRelatedCategories from '@/components/ExploreRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PriceQuoteModal from '@/components/PriceQuoteModal';
import { useState } from 'react';

const ConcreteCalculator = () => {
  // Concrete Dimensions States
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState('meter');
  const [width, setWidth] = useState('');
  const [widthUnit, setWidthUnit] = useState('meter');
  const [depth, setDepth] = useState('');
  const [depthUnit, setDepthUnit] = useState('cm');
  const [gradeOfConcrete, setGradeOfConcrete] = useState('M20 (1:1.5:3)');

  // Results States
  const [results, setResults] = useState({
    cementBags: '',
    looseCementKg: '',
    sand: '',
    aggregate: '',
    cementPrice: '',
    sandPrice: '',
    aggregatePrice: '',
    totalPrice: '',
    concreteVolume: ''
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

  const calculateConcrete = () => {
    if (!length || !width || !depth) {
      alert('Please fill all fields');
      return;
    }

    // Convert all dimensions to meters
    const lengthM = convertToMeters(length, lengthUnit);
    const widthM = convertToMeters(width, widthUnit);
    const depthM = convertToMeters(depth, depthUnit);

    // Calculate concrete volume in cubic meters
    const concreteVolume = lengthM * widthM * depthM;

    // Calculate Wet Volume of Mix
    const wetVolumeOfMix = concreteVolume * 1.524;

    // Parse grade of concrete ratio
    const ratioText = gradeOfConcrete.split('(')[1].split(')')[0];
    const ratioNumbers = ratioText.split(':').map(n => parseFloat(n));
    const sumOfRatio = ratioNumbers.reduce((a, b) => a + b, 0);

    // Calculate No of Cement Bags
    const cementRequired = wetVolumeOfMix / (sumOfRatio * 0.035);
    const cementBags = Math.floor(cementRequired);
    const remainder = cementRequired - cementBags;
    const looseCementKg = Math.ceil(remainder * 50);

    // Calculate Sand (Ton) - Updated formula
    const sandRequired = (wetVolumeOfMix * ratioNumbers[1] / sumOfRatio) * 1.55;

    // Calculate Aggregate (Ton) - Updated formula
    const aggregateRequired = (wetVolumeOfMix * ratioNumbers[2] / sumOfRatio) * 1.35;

    // Calculate estimated prices (example rates)
    const cementBagRate = 350; // per bag
    const sandRate = 1800; // per ton
    const aggregateRate = 1600; // per ton
    
    const cementPrice = (cementBags + (looseCementKg > 0 ? 1 : 0)) * cementBagRate;
    const sandPrice = sandRequired * sandRate;
    const aggregatePrice = aggregateRequired * aggregateRate;
    const totalPrice = cementPrice + sandPrice + aggregatePrice;

    setResults({
      cementBags: cementBags.toString(),
      looseCementKg: looseCementKg.toString(),
      sand: sandRequired.toFixed(2),
      aggregate: aggregateRequired.toFixed(2),
      cementPrice: cementPrice.toFixed(0),
      sandPrice: sandPrice.toFixed(0),
      aggregatePrice: aggregatePrice.toFixed(0),
      totalPrice: totalPrice.toFixed(0),
      concreteVolume: concreteVolume.toFixed(2)
    });
  };

  const clearAll = () => {
    setLength('');
    setWidth('');
    setDepth('');
    setGradeOfConcrete('M20 (1:1.5:3)');
    setResults({ 
      cementBags: '', 
      looseCementKg: '',
      sand: '',
      aggregate: '',
      cementPrice: '',
      sandPrice: '',
      aggregatePrice: '',
      totalPrice: '',
      concreteVolume: ''
    });
  };

  const gradeOptions = [
    { value: 'M25 (1:1:2)', label: 'M25 (1:1:2)' },
    { value: 'M20 (1:1.5:3)', label: 'M20 (1:1.5:3)' },
    { value: 'M15 (1:2:4)', label: 'M15 (1:2:4)' },
    { value: 'M10 (1:3:6)', label: 'M10 (1:3:6)' },
    { value: 'M7.5 (1:4:8)', label: 'M7.5 (1:4:8)' },
    { value: 'M5 (1:5:10)', label: 'M5 (1:5:10)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Concrete Calculator - Calculate Cement, Sand & Aggregate Required
        </h1>
        
        {/* Main Calculator Card */}
        <Card className="mb-6 sm:mb-8 border-2 border-indiamart-teal">
          <CardHeader className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-3">
              🏗️ Concrete Calculator
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Grade of Concrete */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade of Concrete</label>
                <Select value={gradeOfConcrete} onValueChange={setGradeOfConcrete}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Concrete Dimensions Section */}
            <div className="space-y-4">
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
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={calculateConcrete} 
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
            {results.cementBags && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Calculation Results</h3>
                
                {/* Volume of Concrete */}
                <div className="mb-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Volume of Concrete</div>
                    <div className="text-xl font-bold text-blue-600">{results.concreteVolume} m³</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏗️</div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Cement</div>
                        <div className="text-lg font-bold text-indiamart-teal">
                          {results.cementBags} Bags
                          {results.looseCementKg !== '0' && (
                            <div className="text-sm text-orange-600">
                              + {results.looseCementKg} Kg
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
                        <div className="text-lg font-bold text-blue-600">{results.sand} Ton</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">₹{results.sandPrice}</div>
                      <div className="text-xs text-gray-500">Estimated</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🪨</div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Aggregate</div>
                        <div className="text-lg font-bold text-green-600">{results.aggregate} Ton</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">₹{results.aggregatePrice}</div>
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
                  <PriceQuoteModal productType="concrete">
                    <Button className="w-full bg-indiamart-blue hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                      Get Best Price
                    </Button>
                  </PriceQuoteModal>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Categories */}
        <ExploreRelatedCategories />

        {/* Concrete Buying Guide */}
        <Card className="mt-6 sm:mt-8 border-2 border-indiamart-teal">
          <CardHeader className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              🏗️ Concrete Buying Guide
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  What is the grade of concrete and why does it matter?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The grade of concrete refers to its compressive strength measured in megapascals (MPa) or pounds per square inch (psi) after curing for 28 days. Denoted by the letter "M" followed by a number (e.g., M20, M25, M30), the numerical value indicates the concrete's strength in MPa. Higher grades offer greater strength and durability for demanding structural applications.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The grade of the concrete used for the construction of a project matters because it determines the concrete's mix ratio of cement, sand, aggregates, and water. Selection of the appropriate grade depends on various factors, including structural requirements, the foundation of building, environmental exposure conditions, and the specific function the concrete will serve in the construction project.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Different grades of concrete used by home and road construction companies
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-indiamart-teal to-blue-600 text-white">
                        <th className="border border-gray-300 p-3 text-left font-semibold">Grade</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Composition</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-indiamart-teal">M10 Concrete</div>
                          <div className="text-sm text-gray-600">(10 MPa)</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          1:3:6 (cement:sand:aggregates)
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Used for non-structural applications like leveling, flooring, and pathways
                        </td>
                      </tr>
                      
                      <tr className="bg-blue-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-blue-600">M20 Concrete</div>
                          <div className="text-sm text-gray-600">(20 MPa)</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          1:1.5:3 (cement:sand:aggregates)
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Residential foundations, footings, simple RCC structures, pathways, driveways, and general construction where moderate strength is sufficient.
                        </td>
                      </tr>
                      
                      <tr className="bg-green-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-green-600">M25 Concrete</div>
                          <div className="text-sm text-gray-600">(25 MPa)</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          1:1:2 (cement:sand:aggregates)
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Reinforced concrete structures, commercial buildings, beams, columns, slabs, small bridges, and medium-duty industrial floors.
                        </td>
                      </tr>
                      
                      <tr className="bg-orange-50">
                        <td className="border border-gray-300 p-3">
                          <div className="font-semibold text-orange-600">M30 Concrete</div>
                          <div className="text-sm text-gray-600">(30 MPa)</div>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          Design Mix (As per specific requirements)
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          High-rise buildings, heavy-duty industrial floors, highway bridges, water-retaining structures, and marine structures with moderate exposure to aggressive environments.
                        </td>
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

export default ConcreteCalculator;
