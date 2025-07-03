
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const TMTBar = () => {
  const [tmtInputs, setTmtInputs] = useState({
    '8mm': { rods: 0, bundles: 0 },
    '10mm': { rods: 0, bundles: 0 },
    '12mm': { rods: 0, bundles: 0 },
    '16mm': { rods: 0, bundles: 0 },
    '20mm': { rods: 0, bundles: 0 },
    '25mm': { rods: 0, bundles: 0 },
    '32mm': { rods: 0, bundles: 0 }
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (diameter: string, field: 'rods' | 'bundles', value: number) => {
    setTmtInputs(prev => ({
      ...prev,
      [diameter]: {
        ...prev[diameter as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleClearAll = () => {
    setShowResults(false);
    setTmtInputs({
      '8mm': { rods: 0, bundles: 0 },
      '10mm': { rods: 0, bundles: 0 },
      '12mm': { rods: 0, bundles: 0 },
      '16mm': { rods: 0, bundles: 0 },
      '20mm': { rods: 0, bundles: 0 },
      '25mm': { rods: 0, bundles: 0 },
      '32mm': { rods: 0, bundles: 0 }
    });
  };

  const calculateTotals = () => {
    const weights = {
      '8mm': 4.74,
      '10mm': 7.40,
      '12mm': 10.66,
      '16mm': 18.96,
      '20mm': 29.64,
      '25mm': 46.20,
      '32mm': 75.84
    };

    let totalRods = 0;
    let totalWeight = 0;

    Object.entries(tmtInputs).forEach(([diameter, values]) => {
      totalRods += values.rods + (values.bundles * 10);
      totalWeight += (values.rods + (values.bundles * 10)) * weights[diameter as keyof typeof weights];
    });

    const estimatedPrice = totalWeight * 60;

    return { totalRods, totalWeight, estimatedPrice };
  };

  const totals = calculateTotals();

  const tmtBarData = [
    { diameter: '8mm', rods: tmtInputs['8mm'].rods, bundles: tmtInputs['8mm'].bundles, weightPer12m: 4.74 },
    { diameter: '10mm', rods: tmtInputs['10mm'].rods, bundles: tmtInputs['10mm'].bundles, weightPer12m: 7.40 },
    { diameter: '12mm', rods: tmtInputs['12mm'].rods, bundles: tmtInputs['12mm'].bundles, weightPer12m: 10.66 },
    { diameter: '16mm', rods: tmtInputs['16mm'].rods, bundles: tmtInputs['16mm'].bundles, weightPer12m: 18.96 },
    { diameter: '20mm', rods: tmtInputs['20mm'].rods, bundles: tmtInputs['20mm'].bundles, weightPer12m: 29.64 },
    { diameter: '25mm', rods: tmtInputs['25mm'].rods, bundles: tmtInputs['25mm'].bundles, weightPer12m: 46.20 },
    { diameter: '32mm', rods: tmtInputs['32mm'].rods, bundles: tmtInputs['32mm'].bundles, weightPer12m: 75.84 }
  ];

  const tmtChartData = [
    { diameter: '8 mm', weightPerMeter: '0.395', weightPerFeet: '0.1204', weightPer12m: '4.74' },
    { diameter: '10 mm', weightPerMeter: '0.617', weightPerFeet: '0.1881', weightPer12m: '7.40' },
    { diameter: '12 mm', weightPerMeter: '0.888', weightPerFeet: '0.2706', weightPer12m: '10.66' },
    { diameter: '16 mm', weightPerMeter: '1.580', weightPerFeet: '0.4814', weightPer12m: '18.96' },
    { diameter: '20 mm', weightPerMeter: '2.470', weightPerFeet: '0.7529', weightPer12m: '29.64' },
    { diameter: '25 mm', weightPerMeter: '3.850', weightPerFeet: '1.1722', weightPer12m: '46.20' },
    { diameter: '32 mm', weightPerMeter: '6.320', weightPerFeet: '1.9266', weightPer12m: '75.84' }
  ];

  const selectionCriteriaData = [
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
      
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Plan Your Construction Smarter – Use Our TMT Bar Calculator & Tips
          </h1>
        </div>

        {/* TMT Bar Calculator */}
        <Card className="border-4 border-teal-400">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl md:text-2xl text-gray-800 flex items-center justify-center gap-2">
              📊 TMT Bar Calculator
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Calculate Price and Number of TMT Bars</p>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {/* Calculator Table */}
            <div className="overflow-x-auto mb-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-teal-500">
                    <TableHead className="text-white font-semibold">Diameter</TableHead>
                    <TableHead className="text-white font-semibold text-center">
                      <div>Rods</div>
                      <div className="text-xs font-normal">R</div>
                    </TableHead>
                    <TableHead className="text-white font-semibold text-center">
                      <div>Bundles</div>
                      <div className="text-xs font-normal">B</div>
                    </TableHead>
                    <TableHead className="text-white font-semibold">Weight in Kg</TableHead>
                    <TableHead className="text-white font-semibold">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmtBarData.map((row) => {
                    const totalRods = row.rods + (row.bundles * 10);
                    const weight = totalRods * row.weightPer12m;
                    const price = weight * 60;
                    
                    return (
                      <TableRow key={row.diameter}>
                        <TableCell className="font-medium">{row.diameter}</TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            min="0"
                            value={row.rods}
                            onChange={(e) => handleInputChange(row.diameter, 'rods', parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center text-sm"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            min="0"
                            value={row.bundles}
                            onChange={(e) => handleInputChange(row.diameter, 'bundles', parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center text-sm"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {weight.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{Math.round(price).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Button 
                onClick={handleCalculate}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2"
              >
                Calculate
              </Button>
              <Button 
                onClick={handleClearAll}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
              >
                Clear All
              </Button>
            </div>

            {/* Total Summary */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-6">Total Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center">
                <div>
                  <p className="text-gray-600 mb-2">Total Rods</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-500">
                    {showResults ? totals.totalRods : '0'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-2">Est. Price</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-500">
                    ₹{showResults ? Math.round(totals.estimatedPrice).toLocaleString() : '0'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-600 mb-2">Weight</p>
                  <p className="text-xl md:text-2xl font-bold text-green-500">
                    {showResults ? totals.totalWeight.toFixed(2) : '0.00'} Kg
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                * Prices may vary based on market conditions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* More Sellers Near You */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-gray-800">
              More Sellers Near You For{' '}
              <span className="text-blue-600 underline cursor-pointer">TMT Bars</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* TMT Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-gray-800">TMT Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium">Diameter (mm)</TableHead>
                    <TableHead className="text-gray-600 font-medium">Weight per Meter (kg)</TableHead>
                    <TableHead className="text-gray-600 font-medium">Weight per Feet (kg)</TableHead>
                    <TableHead className="text-gray-600 font-medium">Weight per 12m Bar (kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmtChartData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.diameter}</TableCell>
                      <TableCell>{row.weightPerMeter}</TableCell>
                      <TableCell>{row.weightPerFeet}</TableCell>
                      <TableCell>{row.weightPer12m}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* TMT Buying Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-gray-800">TMT Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">TMT grades and their suitability</h3>
              
              <div className="space-y-4 text-sm md:text-base">
                <div>
                  <h4 className="font-semibold text-gray-800">Fe415:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    This is one of the most commonly used TMT grades. The 'Fe' stands for iron, and '415' represents the minimum yield strength of the steel in megapascals (MPa), which is approximately 415 MPa. Fe415 TMT is suitable for a wide range of construction applications.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe500:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fe500 TMT has a minimum yield strength of around 500 MPa. It offers higher strength and is often used in structures where greater load-bearing capacity is required. This grade is suitable for multi storied buildings.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe550:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fe550 TMT has a minimum yield strength of approximately 550 MPa. It is used in applications that demand even higher strength and load-bearing capacity. This grade is suitable for high rise buildings, bridges, and industrial projects.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe600:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fe600 TMT has a minimum yield strength of around 600 MPa, making it one of the strongest TMT grades available. It is used in specialised and heavy-duty construction projects.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Fe415D, Fe500D, Fe550D, and Fe600D:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    The 'D' in these grades stands for 'ductile,' indicating that these TMT bars have enhanced ductility in addition to their specified yield strength. Ductile TMT bars are used in earthquake-prone regions to enhance the structural integrity of buildings during seismic events.
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-gray-600 leading-relaxed">
                    Selecting the right TMT for your construction project is a complex decision that requires careful consideration of multiple factors. From project requirements and TMT grades to corrosion resistance, strength, and sustainability, each element plays a crucial role in ensuring the success and longevity of your endeavour. Consult with experts, evaluate suppliers, and stay informed about emerging trends to make an informed decision that aligns with your project's goals and values.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selection Criteria */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl text-gray-800">Selection Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600 font-medium w-1/3">Criteria</TableHead>
                    <TableHead className="text-gray-600 font-medium">What to Look For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectionCriteriaData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-gray-800 text-sm md:text-base">{row.criteria}</TableCell>
                      <TableCell className="text-gray-600 text-sm md:text-base">{row.whatToLookFor}</TableCell>
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

export default TMTBar;
