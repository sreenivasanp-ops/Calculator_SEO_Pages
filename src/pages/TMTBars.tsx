
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const TMTBars = () => {
  const tmtData = [
    { diameter: '8mm', weightPerMeter: 0.395, weightPerFeet: 0.1204, weightPer12m: 4.74 },
    { diameter: '10mm', weightPerMeter: 0.617, weightPerFeet: 0.1881, weightPer12m: 7.40 },
    { diameter: '12mm', weightPerMeter: 0.888, weightPerFeet: 0.2706, weightPer12m: 10.66 },
    { diameter: '16mm', weightPerMeter: 1.580, weightPerFeet: 0.4814, weightPer12m: 18.96 },
    { diameter: '20mm', weightPerMeter: 2.470, weightPerFeet: 0.7529, weightPer12m: 29.64 },
    { diameter: '25mm', weightPerMeter: 3.850, weightPerFeet: 1.1722, weightPer12m: 46.20 },
    { diameter: '32mm', weightPerMeter: 6.320, weightPerFeet: 1.9266, weightPer12m: 75.84 }
  ];

  // Diameter-specific rods per bundle mapping
  const rodsPerBundle = {
    '8mm': 10,
    '10mm': 7,
    '12mm': 5,
    '16mm': 3,
    '20mm': 2,
    '25mm': 1,
    '32mm': 1
  };

  // State for calculator inputs
  const [calculatorData, setCalculatorData] = useState(
    tmtData.map(item => ({
      diameter: item.diameter,
      rods: 0,
      bundles: 0,
      bundleRods: 0,
      weight: 0,
      price: 0,
      weightPer12m: item.weightPer12m
    }))
  );

  // Price per kg (example rate, can be made configurable)
  const pricePerKg = 65;

  // Check if any inputs are present to show price column
  const hasInputs = calculatorData.some(item => 
    item.rods > 0 || item.bundles > 0 || item.bundleRods > 0 || item.weight > 0
  );

  const handleInputChange = (index: number, field: string, value: string) => {
    const numValue = Math.max(0, parseFloat(value) || 0);
    const diameter = calculatorData[index].diameter;
    const rodsPerBundleForDia = rodsPerBundle[diameter];
    
    setCalculatorData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: numValue };
      
      if (field === 'rods') {
        // When rods change, calculate bundles and remaining rods
        const totalRods = numValue;
        const fullBundles = Math.floor(totalRods / rodsPerBundleForDia);
        const remainingRods = totalRods % rodsPerBundleForDia;
        
        newData[index].bundles = fullBundles;
        newData[index].bundleRods = remainingRods;
        newData[index].weight = totalRods * newData[index].weightPer12m;
        newData[index].price = newData[index].weight * pricePerKg;
        
      } else if (field === 'bundles') {
        // When bundles change, calculate total rods
        const totalRodsFromBundles = numValue * rodsPerBundleForDia;
        newData[index].rods = totalRodsFromBundles;
        newData[index].bundleRods = 0; // No remaining rods when entering complete bundles
        newData[index].weight = totalRodsFromBundles * newData[index].weightPer12m;
        newData[index].price = newData[index].weight * pricePerKg;
        
      } else if (field === 'weight') {
        // When weight changes, calculate total rods, bundles, and remaining rods
        const totalRods = Math.round(numValue / newData[index].weightPer12m);
        const fullBundles = Math.floor(totalRods / rodsPerBundleForDia);
        const remainingRods = totalRods % rodsPerBundleForDia;
        
        newData[index].rods = totalRods;
        newData[index].bundles = fullBundles;
        newData[index].bundleRods = remainingRods;
        newData[index].price = numValue * pricePerKg;
      }
      
      return newData;
    });
  };

  const calculateTotals = () => {
    // Recalculate all values
    setCalculatorData(prev => 
      prev.map(item => {
        const totalRods = item.rods;
        const weight = totalRods * item.weightPer12m;
        const price = weight * pricePerKg;
        return { ...item, weight, price };
      })
    );
  };

  const clearAll = () => {
    setCalculatorData(prev => 
      prev.map(item => ({
        ...item,
        rods: 0,
        bundles: 0,
        bundleRods: 0,
        weight: 0,
        price: 0
      }))
    );
  };

  const totalRods = calculatorData.reduce((sum, item) => sum + item.rods, 0);
  const totalWeight = calculatorData.reduce((sum, item) => sum + item.weight, 0);
  const totalPrice = calculatorData.reduce((sum, item) => sum + item.price, 0);

  // Selection Criteria
  const selectionCriteria = [
    { criteria: 'Grade', whatToLookFor: 'Fe 415, Fe 500, Fe 550D, Fe 600 (Higher grade = Higher strength)' },
    { criteria: 'Corrosion Resistance', whatToLookFor: 'Go for CRS (Corrosion Resistant Steel) for coastal/monsoon areas' },
    { criteria: 'Earthquake Resistance', whatToLookFor: 'Fe 500D or Fe 550D bars (more ductile, better shock resistance)' },
    { criteria: 'Brand Certification', whatToLookFor: 'ISI Certified brands only (e.g., Tata Tiscon, JSW Neosteel)' },
    { criteria: 'Bendability', whatToLookFor: 'Check for ductility and elongation – key for seismic zones' },
    { criteria: 'Surface Finish', whatToLookFor: 'Should be ribbed for better concrete bonding' },
    { criteria: 'Weldability', whatToLookFor: 'Especially important in industrial & commercial construction' },
    { criteria: 'Testing Parameters', whatToLookFor: 'Ensure the bars are lab-tested for elongation, tensile strength' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Plan Your Construction Smarter – Use Our TMT Bar Calculator & Tips
        </h1>
        
        {/* TMT Bar Calculator Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-teal-200">
          <CardHeader className="bg-teal-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              🧮 TMT Bar Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Calculate Price and Number of TMT Bars
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
              {/* Calculator Table */}
              <div className="xl:col-span-3">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <Table className="w-full min-w-[320px]">
                    <TableHeader>
                      <TableRow className="bg-teal-500">
                        <TableHead className="text-white font-semibold text-center text-xs sm:text-sm p-1 sm:p-2">Dia</TableHead>
                        <TableHead className="text-white font-semibold text-center text-xs sm:text-sm p-1 sm:p-2">Rods</TableHead>
                        <TableHead className="text-white font-semibold text-center text-xs sm:text-sm p-1 sm:p-2">
                          <div className="flex flex-col">
                            <span>Bundles</span>
                            <div className="flex justify-center gap-1 text-xs mt-1">
                              <span className="w-8">B</span>
                              <span className="w-6">R</span>
                            </div>
                          </div>
                        </TableHead>
                        <TableHead className="text-white font-semibold text-center text-xs sm:text-sm p-1 sm:p-2">Kg</TableHead>
                        {hasInputs && (
                          <TableHead className="text-white font-semibold text-center text-xs sm:text-sm p-1 sm:p-2">Price</TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculatorData.map((row, index) => (
                        <TableRow key={row.diameter} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-center text-xs sm:text-sm p-1 sm:p-2">{row.diameter}</TableCell>
                          <TableCell className="text-center p-0.5 sm:p-1">
                            <Input
                              type="number"
                              min="0"
                              value={row.rods || ''}
                              onChange={(e) => handleInputChange(index, 'rods', e.target.value)}
                              className="w-12 sm:w-14 h-6 sm:h-8 text-center text-xs border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-1"
                              placeholder="0"
                            />
                          </TableCell>
                          <TableCell className="text-center p-0.5 sm:p-1">
                            <div className="flex justify-center gap-0.5">
                              <Input
                                type="number"
                                min="0"
                                step="0.1"
                                value={row.bundles || ''}
                                onChange={(e) => handleInputChange(index, 'bundles', e.target.value)}
                                className="w-12 sm:w-14 h-6 sm:h-8 text-center text-xs border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-1"
                                placeholder="0"
                              />
                              <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center bg-gray-100 rounded border text-xs text-gray-600">
                                {row.bundleRods}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center p-0.5 sm:p-1">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={row.weight || ''}
                              onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                              className="w-14 sm:w-16 h-6 sm:h-8 text-center text-xs border-gray-300 focus:border-teal-500 focus:ring-teal-500 p-1"
                              placeholder="0.00"
                            />
                          </TableCell>
                          {hasInputs && (
                            <TableCell className="text-center font-medium text-green-600 text-xs sm:text-sm p-1 sm:p-2">
                              ₹{row.price.toFixed(0)}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <Button 
                    onClick={calculateTotals}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 sm:px-6 text-sm"
                  >
                    Calculate
                  </Button>
                  <Button 
                    onClick={clearAll}
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 px-4 sm:px-6 text-sm"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Summary Section */}
              <div className="xl:col-span-1">
                <Card className="h-fit border-2 border-gray-200">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                    <CardTitle className="text-base sm:text-lg text-center">Total Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                    <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Est. Price</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-500">₹{totalPrice.toFixed(0)}</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Weight</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-500">{totalWeight.toFixed(2)} Kg</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Rods</p>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-500">{totalRods}</p>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                      * Prices may vary based on market conditions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Sellers Section */}
        <div className="mb-6 sm:mb-8 px-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            More Sellers Near You For <span className="text-blue-600 underline">TMT Bars</span>
          </h2>
        </div>

        {/* TMT Bar Chart Section - Optimized */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">TMT Bar Chart</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table className="w-full min-w-[280px]">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-semibold text-gray-700 text-center text-xs sm:text-sm p-1 sm:p-2 w-[20%]">Dia</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-center text-xs sm:text-sm p-1 sm:p-2 w-[26%]">
                      <div className="flex flex-col">
                        <span className="hidden sm:inline">Weight/Meter</span>
                        <span className="sm:hidden">Wt/M</span>
                        <span className="text-xs">(kg)</span>
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 text-center text-xs sm:text-sm p-1 sm:p-2 w-[26%]">
                      <div className="flex flex-col">
                        <span className="hidden sm:inline">Weight/Feet</span>
                        <span className="sm:hidden">Wt/Ft</span>
                        <span className="text-xs">(kg)</span>
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 text-center text-xs sm:text-sm p-1 sm:p-2 w-[28%]">
                      <div className="flex flex-col">
                        <span className="hidden sm:inline">Weight/12m Bar</span>
                        <span className="sm:hidden">Wt/12m</span>
                        <span className="text-xs">(kg)</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmtData.map((row, index) => (
                    <TableRow key={row.diameter} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <TableCell className="font-medium text-center text-xs sm:text-sm p-1 sm:p-2">{row.diameter.replace('mm', ' mm')}</TableCell>
                      <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-2">{row.weightPerMeter}</TableCell>
                      <TableCell className="text-center text-xs sm:text-sm p-1 sm:p-2">{row.weightPerFeet}</TableCell>
                      <TableCell className="text-center font-medium text-xs sm:text-sm p-1 sm:p-2">{row.weightPer12m}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* TMT Buying Guide Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">TMT Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">TMT grades and their suitability</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Fe415:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    This is one of the most commonly used TMT grades. The 'Fe' stands for iron, and '415' represents the minimum yield strength of the steel in megapascals (MPa), which is approximately 415 MPa. Fe415 TMT is suitable for a wide range of construction applications.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Fe500:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Fe500 TMT has a minimum yield strength of around 500 MPa. It offers higher strength and is often used in structures where greater load-bearing capacity is required. This grade is suitable for multi storied buildings.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Fe550:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Fe550 TMT has a minimum yield strength of approximately 550 MPa. It is used in applications that demand even higher strength and load-bearing capacity. This grade is suitable for high rise buildings, bridges, and industrial projects.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Fe600:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Fe600 TMT has a minimum yield strength of around 600 MPa, making it one of the strongest TMT grades available. It is used in specialised and heavy-duty construction projects.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Fe415D, Fe500D, Fe550D, and Fe600D:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    The 'D' in these grades stands for 'ductile,' indicating that these TMT bars have enhanced ductility in addition to their specified yield strength. Ductile TMT bars are used in earthquake-prone regions to enhance the structural integrity of buildings during seismic events.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                Selecting the right TMT for your construction project is a complex decision that requires careful consideration of multiple factors. From project requirements and TMT grades to corrosion resistance, strength, and sustainability, each element plays a crucial role in ensuring the success and longevity of your endeavour. Consult with experts, evaluate suppliers, and stay informed about emerging trends to make an informed decision that aligns with your project's goals and values.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Selection Criteria Section */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Selection Criteria</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table className="w-full min-w-[280px]">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm p-1 sm:p-2 w-[30%]">Criteria</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm p-1 sm:p-2">What to Look For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectionCriteria.map((item, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <TableCell className="font-medium text-xs sm:text-sm p-1 sm:p-2">{item.criteria}</TableCell>
                      <TableCell className="text-xs sm:text-sm p-1 sm:p-2">{item.whatToLookFor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TMTBars;
