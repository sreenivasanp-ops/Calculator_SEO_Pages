import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import ExploreRelatedCategories from '@/components/ExploreRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BLForm from '@/components/BLForm';
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
  const pricePerKg = 62;

  // State to track if calculate button has been clicked
  const [calculated, setCalculated] = useState(false);

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
    setCalculated(true);
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
    setCalculated(false);
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
      <AllCalculatorsCTA />
      
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
            {/* Mobile & Tablet Layout (original - unchanged) */}
            <div className="xl:hidden">
              <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
                <Table className="w-full min-w-[600px]">
                  <TableHeader>
                    <TableRow className="bg-teal-500 hover:bg-teal-500">
                      <TableHead className="text-white font-semibold text-center text-sm p-3">Diameter</TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-3">Rods</TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-3">
                        <div className="flex flex-col">
                          <span>Bundles</span>
                          <div className="flex justify-center gap-2 text-xs mt-1">
                            <span className="w-8">B</span>
                            <span className="w-8">R</span>
                          </div>
                        </div>
                      </TableHead>
                      <TableHead className="text-white font-semibold text-center text-sm p-3">Weight in Kg</TableHead>
                      {hasInputs && calculated && (
                        <TableHead className="text-white font-semibold text-center text-sm p-3">Price</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatorData.map((row, index) => (
                      <TableRow key={row.diameter} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-center text-sm p-3">{row.diameter}</TableCell>
                        <TableCell className="text-center p-3">
                          <Input
                            type="number"
                            min="0"
                            value={row.rods || ''}
                            onChange={(e) => handleInputChange(index, 'rods', e.target.value)}
                            className="w-20 h-10 text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 mx-auto"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell className="text-center p-3">
                          <div className="flex justify-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              value={row.bundles || ''}
                              onChange={(e) => handleInputChange(index, 'bundles', e.target.value)}
                              className="w-16 h-10 text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                              placeholder="0"
                            />
                            <div className="w-16 h-10 flex items-center justify-center bg-gray-100 rounded border text-sm text-gray-600">
                              {row.bundleRods}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-3">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={row.weight || ''}
                            onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                            className="w-24 h-10 text-center border-gray-300 focus:border-teal-500 focus:ring-teal-500 mx-auto"
                            placeholder="0.00"
                          />
                        </TableCell>
                        {hasInputs && calculated && (
                          <TableCell className="text-center font-medium text-green-600 text-sm p-3">
                            ₹{row.price.toFixed(0)}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-center gap-4 mb-6">
                <Button 
                  onClick={calculateTotals}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2"
                >
                  Calculate
                </Button>
                <Button 
                  onClick={clearAll}
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-2"
                >
                  Clear All
                </Button>
              </div>

              {/* Summary Section for Mobile/Tablet - Original Layout */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="pb-3 p-6">
                  <CardTitle className="text-lg text-center">Total Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Rods</p>
                    <p className="text-3xl font-bold text-orange-500">{totalRods}</p>
                  </div>
                  
                  {calculated && (
                    <>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Est. Price</p>
                        <p className="text-3xl font-bold text-blue-500">₹{totalPrice.toFixed(0)}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Weight</p>
                        <p className="text-3xl font-bold text-green-500">{totalWeight.toFixed(2)} Kg</p>
                      </div>
                    </>
                  )}
                  
                  {calculated && (
                    <p className="text-xs text-gray-500 text-center mt-4">
                      * Prices may vary based on market conditions
                    </p>
                  )}
                  
                  {/* Get Best Price CTA */}
                  <div className={`${calculated ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                    <BLForm productType="tmt">
                      <Button className="w-full bg-indiamart-teal hover:bg-indiamart-teal-dark text-white py-3 rounded-lg font-medium">
                        Get Best Price
                      </Button>
                    </BLForm>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Layout (xl: and above) - New Side-by-Side Design */}
            <div className="hidden xl:block">
              <div className="flex gap-8">
                {/* Left side: Calculator */}
                <div className="flex-1">
                  <div className="overflow-hidden rounded-lg border-2 border-teal-200">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow className="bg-teal-500 hover:bg-teal-500">
                          <TableHead className="text-white font-semibold text-center text-base p-4">Diameter</TableHead>
                          <TableHead className="text-white font-semibold text-center text-base p-4">Rods</TableHead>
                          <TableHead className="text-white font-semibold text-center text-base p-4">
                            <div className="flex flex-col">
                              <span>Bundles</span>
                              <div className="flex justify-center gap-4 text-sm mt-1">
                                <span className="w-8">B</span>
                                <span className="w-8">R</span>
                              </div>
                            </div>
                          </TableHead>
                          <TableHead className="text-white font-semibold text-center text-base p-4">Weight in Kg</TableHead>
                          {hasInputs && calculated && (
                            <TableHead className="text-white font-semibold text-center text-base p-4">Price</TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculatorData.map((row, index) => (
                          <TableRow key={row.diameter} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-center text-base p-4">{row.diameter}</TableCell>
                            <TableCell className="text-center p-4">
                              <Input
                                type="number"
                                min="0"
                                value={row.rods || ''}
                                onChange={(e) => handleInputChange(index, 'rods', e.target.value)}
                                className="w-24 h-12 text-center text-base border-gray-300 focus:border-teal-500 focus:ring-teal-500 mx-auto"
                                placeholder="0"
                              />
                            </TableCell>
                            <TableCell className="text-center p-4">
                              <div className="flex justify-center gap-3">
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.1"
                                  value={row.bundles || ''}
                                  onChange={(e) => handleInputChange(index, 'bundles', e.target.value)}
                                  className="w-20 h-12 text-center text-base border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                                  placeholder="0"
                                />
                                <div className="w-20 h-12 flex items-center justify-center bg-gray-100 rounded border text-base text-gray-600">
                                  {row.bundleRods}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center p-4">
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={row.weight || ''}
                                onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                                className="w-28 h-12 text-center text-base border-gray-300 focus:border-teal-500 focus:ring-teal-500 mx-auto"
                                placeholder="0.00"
                              />
                            </TableCell>
                            {hasInputs && calculated && (
                              <TableCell className="text-center font-medium text-green-600 text-base p-4">
                                ₹{row.price.toFixed(0)}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-6">
                    <Button 
                      onClick={calculateTotals}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-base"
                    >
                      Calculate
                    </Button>
                    <Button 
                      onClick={clearAll}
                      variant="outline" 
                      className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 text-base"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
                
                {/* Right side: Summary */}
                <div className="w-80">
                  <Card className="border-2 border-teal-200 h-fit">
                    <CardHeader className="bg-teal-50 p-6">
                      <CardTitle className="text-xl text-center text-gray-800">Total Summary</CardTitle>
                      <p className="text-sm text-center text-gray-600 mt-1">Calculate Price and Number of TMT Bars</p>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Total Rods</p>
                        <p className="text-4xl font-bold text-orange-500">{totalRods}</p>
                      </div>
                      
                      {calculated && (
                        <>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">Est. Price</p>
                            <p className="text-4xl font-bold text-blue-500">₹{totalPrice.toFixed(0)}</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">Weight</p>
                            <p className="text-4xl font-bold text-green-500">{totalWeight.toFixed(2)} Kg</p>
                          </div>
                        </>
                      )}
                      
                      {calculated && (
                        <p className="text-xs text-gray-500 text-center mt-4">
                          * Prices may vary based on market conditions
                        </p>
                      )}
                      
                      {/* Get Best Price CTA */}
                      <div className={`${calculated ? 'mt-6 pt-6 border-t border-gray-200' : ''}`}>
                        <BLForm productType="tmt">
                          <Button className="w-full bg-indiamart-teal hover:bg-indiamart-teal-dark text-white py-3 rounded-lg font-medium text-base">
                            Get Best Price
                          </Button>
                        </BLForm>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Sellers Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 px-2">
            More Sellers Near You For{' '}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">TMT Bars</a>
          </h2>
          {/* Additional seller content can be added here */}
        </div>

        {/* TMT Bar Chart Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-orange-200">
          <CardHeader className="bg-orange-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">TMT Bar Chart</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <div className="overflow-x-auto">
              <Table className="w-full min-w-[500px]">
                <TableHeader>
                  <TableRow className="bg-orange-500 hover:bg-orange-500">
                    <TableHead className="text-white font-semibold text-center text-sm p-3">Diameter (mm)</TableHead>
                    <TableHead className="text-white font-semibold text-center text-sm p-3">Weight per Meter (kg)</TableHead>
                    <TableHead className="text-white font-semibold text-center text-sm p-3">Weight per Feet (kg)</TableHead>
                    <TableHead className="text-white font-semibold text-center text-sm p-3">Weight per 12m Bar (kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmtData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-center text-sm p-3">{row.diameter.replace('mm', ' mm')}</TableCell>
                      <TableCell className="text-center text-sm p-3">{row.weightPerMeter}</TableCell>
                      <TableCell className="text-center text-sm p-3">{row.weightPerFeet}</TableCell>
                      <TableCell className="text-center text-sm p-3">{row.weightPer12m}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Selection Criteria Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">TMT Bar Selection Criteria</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <div className="overflow-x-auto">
              <Table className="w-full min-w-[600px]">
                <TableHeader>
                  <TableRow className="bg-blue-500 hover:bg-blue-500">
                    <TableHead className="text-white font-semibold text-center text-sm p-3">Criteria</TableHead>
                    <TableHead className="text-white font-semibold text-center text-sm p-3">What to Look For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectionCriteria.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-center text-sm p-3">{row.criteria}</TableCell>
                      <TableCell className="text-center text-sm p-3">{row.whatToLookFor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ExploreRelatedCategories />
    </div>
  );
};

export default TMTBars;
